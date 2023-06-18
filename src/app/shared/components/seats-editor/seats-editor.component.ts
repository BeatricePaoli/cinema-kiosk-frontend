import { AfterViewInit, Component, ElementRef, HostListener, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { fabric } from 'fabric';
import { FormControl, FormGroup, Validators } from '@angular/forms';

enum EditorMode {
  SELECT = "SELECT",
  ADD = "ADD",
}

const SEAT_SIZE = 20;
const PADDING = 5;

@Component({
  selector: 'app-seats-editor',
  templateUrl: './seats-editor.component.html',
  styleUrls: ['./seats-editor.component.scss']
})
export class SeatsEditorComponent implements OnInit, AfterViewInit {

  @ViewChild('canvasContainer')
  canvasContainer?: ElementRef;

  @Input()
  editMode: boolean = false;

  canvas?: fabric.Canvas;

  mode: EditorMode = EditorMode.SELECT;

  totSeats: number = 0;

  // Dragging
  isDragging: boolean = false;
  lastPosX: number = 0;
  lastPosY: number = 0;

  // Undo/Redo
  state: string | undefined;
  isUndoDisabled: boolean = true;
  isRedoDisabled: boolean = true;
  undoStack: string[] = [];
  redoStack: string[] = [];

  // Edit
  selectedSeat: fabric.Group | null = null;
  editSeatForm = new FormGroup({
    label: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  // Create
  isDrawing: boolean = false;
  origX: number = 0;
  origY: number = 0;
  previousCols: number = 0;
  previousRow: number = 0;
  previewSeats: fabric.Group[] = [];

  constructor(private zone: NgZone,
    private viewportRuler: ViewportRuler
  ) { }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.canvas = new fabric.Canvas('fabricSurface', {
        selection: true,
        preserveObjectStacking: true,
        backgroundColor: "transparent"
      });

      this.resizeCanvas();

      var screen = new fabric.Text("Schermo", {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Montserrat, sans-serif',
        charSpacing: 1.2,
        fill: '#545252',
        top: PADDING,
        left: 0.5 * this.canvas.getWidth() - 75, // Numero magico per farlo stare al centro, pazienza per i18n
        selectable: false,
        hoverCursor: 'default'
      });
      this.canvas.add(screen);

      // Salva stato iniziale
      this.saveState();
    });
  }

  ngOnInit(): void {
    this.canvas?.on('mouse:wheel', (opt: fabric.IEvent<WheelEvent>) => {
      var delta = opt.e.deltaY;
      var zoom = this.canvas?.getZoom() ?? 0;
      zoom *= 0.999 ** delta; // fidati funziona (vedi es. CG)

      // Valori di max e min
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;

      // this.canvas?.setZoom(zoom); // Zoom generico
      this.canvas?.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom); // Zoom su cursore

      opt.e.stopPropagation();
      opt.e.preventDefault();
    });

    this.canvas?.on('mouse:down', (opt) => {
      var evt = opt.e;
      if (evt.ctrlKey === true) {
        this.isDragging = true;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
      }

      if (this.mode === EditorMode.ADD) {
        this.isDrawing = true;
        const pointer = this.canvas?.getPointer(opt.e);
        if (pointer) {
          this.origX = pointer.x;
          this.origY = pointer.y;
          const width = Math.abs(pointer.x - this.origX);
          const height = Math.abs(pointer.y - this.origY);
          this.previewSeats = this.createSeatsBlock(this.origX, this.origY, width, height);
          this.canvas?.add(...this.previewSeats);
        }
      }
    });

    this.canvas?.on('mouse:move', (opt) => {
      if (this.canvas?.viewportTransform && this.isDragging) {
        var e = opt.e;
        var vpt = this.canvas?.viewportTransform;
        vpt[4] += e.clientX - this.lastPosX;
        vpt[5] += e.clientY - this.lastPosY;
        this.canvas?.requestRenderAll();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
      }

      if (this.mode === EditorMode.ADD && this.isDrawing) {
        var pointer = this.canvas?.getPointer(opt.e);

        if (pointer) {
          const width = Math.abs(pointer.x - this.origX);
          const height = Math.abs(pointer.y - this.origY);
          const { blockRows, blockCols } = this.getSeatsRowColsToCreate(width, height);

          if (blockRows !== this.previousRow || blockCols !== this.previousCols) {
            this.canvas?.remove(...this.previewSeats);
            this.previewSeats = this.createSeatsBlock(this.origX, this.origY, width, height);
            this.canvas?.add(...this.previewSeats);
          }
        }
      }
    });

    this.canvas?.on('mouse:up', () => {
      if (this.canvas?.viewportTransform && this.isDragging) {
        this.canvas?.setViewportTransform(this.canvas?.viewportTransform);
        this.isDragging = false;
      }

      if (this.mode === EditorMode.ADD && this.isDrawing) {
        this.isDrawing = false;

        this.zone.run(() => this.totSeats += this.previousCols * this.previousRow);
        this.previousRow = 0;
        this.previousCols = 0;

        if (this.previewSeats.length > 0) {
          this.zone.run(() => this.saveState());
          this.previewSeats = [];
        }
      }
    });

    // ATTENZIONE: eventi fabric fuori change detection! Se si modifica qualche variabile va usato zone.run
    this.canvas?.on('object:modified', () => {
      this.zone.run(() => this.saveState());
    });

    this.canvas?.on('selection:created', (opt) => {
      this.zone.run(() => this.setSelectedSeat(opt));
    });

    this.canvas?.on('selection:updated', (opt) => {
      this.zone.run(() => this.setSelectedSeat(opt));
    });

    this.canvas?.on('selection:cleared', () => {
      this.zone.run(() => this.selectedSeat = null);
    });

    // TODO: Check se è veramente più performante rispetto a
    // - @HostListener('window:resize', ['$event']) (più check)
    // - ResizeObserver (più verboso)
    // https://stackoverflow.com/questions/40659090/element-height-and-width-change-detection-in-angular-2
    this.viewportRuler.change(200).subscribe(() => this.zone.run(() => {
      this.resizeCanvas();
    }));
  }

  resizeCanvas() {
    const width = this.canvasContainer?.nativeElement.offsetWidth;
    const height = this.canvasContainer?.nativeElement.offsetHeight;
    this.canvas?.setWidth(width);
    this.canvas?.setHeight(height);
  }

  @HostListener('window:keyup.delete')
  delete() {
    const selected = this.canvas?.getActiveObjects() ?? [];
    this.canvas?.remove(...selected);
    this.totSeats -= selected.length;
    this.canvas?.requestRenderAll();
    this.saveState();
  }

  @HostListener('window:keydown.control.z')
  undo() {
    if (!this.isUndoDisabled) {
      this.replay(true);
    }
  }

  @HostListener('window:keydown.control.y')
  redo() {
    if (!this.isRedoDisabled) {
      this.replay(false);
    }
  }

  saveState() {
    this.redoStack = [];
    this.isRedoDisabled = true;

    // Per chiamate successive alla prima (init canvas)
    if (this.state) {
      this.undoStack.push(this.state);
      this.isUndoDisabled = false;
    }

    this.state = JSON.stringify(this.canvas);
  }

  replay(isUndo: boolean) {
    let playStack = isUndo ? this.undoStack : this.redoStack;
    let saveStack = isUndo ? this.redoStack : this.undoStack;

    if (this.state) {
      saveStack.push(this.state);
      this.state = playStack.pop();

      this.isRedoDisabled = true;
      this.isUndoDisabled = true;

      this.canvas?.clear();
      this.canvas?.loadFromJSON(this.state, () => {
        this.canvas?.renderAll();

        const objects = this.canvas?.getObjects();
        this.totSeats = objects?.length! - 1;

        if (isUndo) {
          this.isRedoDisabled = false;
        } else {
          this.isUndoDisabled = false;
        }

        if (playStack.length > 0) {
          if (isUndo) {
            this.isUndoDisabled = false;
          } else {
            this.isRedoDisabled = false;
          }
        }
      });
    }
  }

  setSelectedSeat(opt: fabric.IEvent<MouseEvent>) {
    if (opt.selected && opt.selected.length === 1) {
      this.selectedSeat = opt.selected[0] as fabric.Group;
      const text = this.selectedSeat.getObjects()[1] as fabric.IText;
      this.editSeatForm.patchValue({
        label: text.text
      });
    }
  }

  onEditSelectedSeat() {
    const label = this.editSeatForm.value.label;
    if (label && this.selectedSeat) {
      const text = this.selectedSeat.getObjects()[1] as fabric.IText;
      text.text = label;
      this.selectedSeat.dirty = true;
      this.canvas?.renderAll();
    }
  }

  onSaveScreen() {
    // console.log(JSON.stringify(this.canvas));
    console.log(this.canvas?.toSVG()); // più piccolo
    // Deserialize: fabric.loadSVGFromURL vs fabric.loadSVGFromString
  }

  onSelectModeClick() {
    this.mode = EditorMode.SELECT;
  }

  onAddModeClick() {
    this.mode = EditorMode.ADD;
  }

  getSeatsRowColsToCreate(width: number, height: number) {
    return {
      blockRows: Math.trunc(height / (SEAT_SIZE + PADDING * 2)),
      blockCols: Math.trunc(width / (SEAT_SIZE + PADDING)),
    }
  }

  createSeatsBlock(startX: number, startY: number, width: number, height: number): fabric.Group[] {
    if (width < SEAT_SIZE || height < SEAT_SIZE) {
      return [];
    }

    const seats = [];

    const { blockRows, blockCols } = this.getSeatsRowColsToCreate(width, height);
    this.previousRow = blockRows;
    this.previousCols = blockCols;

    for (let i = 0; i < blockRows; i++) {

      // lettere maiuscole
      const letter = String.fromCharCode(65 + i % 26);
      const rowLabel = i < 26 ? letter : letter + Math.trunc(i / 26);

      const rowHeight = startY + (SEAT_SIZE + PADDING * 2) * i;

      for (let j = 0; j < blockCols; j++) {
        var rect = new fabric.Rect({
          fill: 'pink',
          originX: 'center',
          originY: 'center',
          width: SEAT_SIZE,
          height: SEAT_SIZE,
        });

        var text = new fabric.Text(rowLabel + "-" + (j + 1), {
          fontSize: 10,
          fontWeight: 'bold',
          fontFamily: 'Montserrat, sans-serif',
          originX: 'center',
          originY: 'center',
          selectable: false,
        });

        var seat = new fabric.Group([rect, text], {
          left: startX + j * (PADDING + SEAT_SIZE),
          top: rowHeight,
        });
        seats.push(seat);
      }
    }

    return seats;
  }
}
