import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, NgZone, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { fabric } from 'fabric';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TheaterScreen } from 'src/app/core/models/theater';

enum EditorMode {
  SELECT = "SELECT",
  ADD = "ADD",
}

const SEAT_SIZE = 20;
const PADDING = 5;
const HALF_SCREEN = 75;

@Component({
  selector: 'app-seats-editor',
  templateUrl: './seats-editor.component.html',
  styleUrls: ['./seats-editor.component.scss']
})
export class SeatsEditorComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('canvasContainer')
  canvasContainer?: ElementRef;

  @Input()
  screen?: TheaterScreen;

  @Input()
  creativeMode: boolean = false;

  @Input()
  seatsTaken: string[] = [];

  @Output()
  selectedSeats: EventEmitter<string[]> = new EventEmitter<string[]>();

  @Output()
  onSave: EventEmitter<any> = new EventEmitter<any>();

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
    label: new FormControl('', Validators.required),
  });
  showDeleteCtrl: boolean = false;

  // Create
  isDrawing: boolean = false;
  origX: number = 0;
  origY: number = 0;
  previousCols: number = 0;
  previousRow: number = 0;
  previewSeats: fabric.Group[] = [];

  // Booking
  selectedSeatsInternal: string[] = [];

  // Screen
  screenForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(private zone: NgZone,
    private viewportRuler: ViewportRuler,
  ) { }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.canvas = new fabric.Canvas('fabricSurface', {
        selection: true,
        preserveObjectStacking: true,
        backgroundColor: "transparent"
      });
    });

    this.canvas?.on('mouse:wheel', (opt: fabric.IEvent<WheelEvent>) => {
      var delta = opt.e.deltaY;
      var zoom = this.canvas?.getZoom() ?? 0;
      zoom *= 0.999 ** delta; // fidati funziona (vedi es. CG)

      // Valori di max e min
      if (zoom > 4) zoom = 4;
      if (zoom < 0.7) zoom = 0.7;

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

      if (this.creativeMode && this.mode === EditorMode.ADD) {
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

      if (this.creativeMode && this.mode === EditorMode.ADD && this.isDrawing) {
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

      if (this.creativeMode && this.mode === EditorMode.ADD && this.isDrawing) {
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
      this.zone.run(() => {
        if (this.creativeMode) {
          this.setSelectedSeatToEdit(opt);
          this.showDeleteCtrl = true;
        } else {
          this.setSelectedSeatToBook(opt);
        }
      });
    });

    this.canvas?.on('selection:updated', (opt) => {
      this.zone.run(() => {
        if (this.creativeMode) {
          this.setSelectedSeatToEdit(opt);
          this.showDeleteCtrl = true;
        } else {
          this.setSelectedSeatToBook(opt);
        }
      });
    });

    this.canvas?.on('selection:cleared', () => {
      this.zone.run(() => {
        if (this.creativeMode) {
          this.selectedSeat = null;
          this.showDeleteCtrl = false;
        }
      });
    });

    this.viewportRuler.change(200).subscribe(() => this.zone.run(() => {
      this.resizeCanvas();
    }));
  }

  ngAfterViewInit(): void {
    this.resizeCanvas();

    if (this.canvas) {
      var screen = new fabric.Text("Schermo", {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Montserrat, sans-serif',
        charSpacing: 1.2,
        fill: '#545252',
        top: PADDING,
        left: 0.5 * this.canvas.getWidth() - HALF_SCREEN,
        selectable: false,
        hoverCursor: 'default'
      });
      this.canvas.add(screen);

      if (this.screen) {
        this.loadCanvas(this.screen.seatChart);
      }

      // Salva stato iniziale
      this.saveState();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['screen'] && changes['screen'].currentValue) {
      const screen = changes['screen'].currentValue;
      this.loadCanvas(screen.seatChart);

      if (this.creativeMode) {
        this.screenForm.patchValue({
          name: screen.name
        });
      }
    }

    if (changes['seatsTaken'] && changes['seatsTaken'].currentValue) {
      this.setSeatsTaken(changes['seatsTaken'].currentValue);
    }
  }

  loadCanvas(json: Object) {
    this.canvas?.loadFromJSON(json, () => {
      if (!this.creativeMode) {
        this.canvas?.forEachObject(o => {
          o.lockMovementX = true;
          o.lockMovementY = true;
          o.lockRotation = true;
          o.lockScalingFlip = true;
          o.lockScalingX = true;
          o.lockScalingY = true;
          o.lockSkewingX = true;
          o.lockSkewingY = true;
          o.hasControls = false;
          o.hoverCursor = 'pointer';

          // Centra viewport in base a label 'Schermo'
          if (o instanceof fabric.Text) {
            this.centerViewportOnScreen(o);
          }
        });

        this.canvas!.selection = false;

        this.setSeatsTaken(this.seatsTaken);
      } else {
        this.canvas?.forEachObject(o => {
          // Centra viewport in base a label 'Schermo'
          if (o instanceof fabric.Text) {
            this.centerViewportOnScreen(o);
          }
        });

        this.resetActionState();
        this.saveState();
        this.totSeats = this.canvas?.getObjects() ? this.canvas?.getObjects().length - 1 : 0;
      }

    });
  }

  setSeatsTaken(seatsTaken: string[]) {
    if (seatsTaken.length > 0) {
      this.canvas?.forEachObject(o => {
        if (o instanceof fabric.Group) {
          const group = o as fabric.Group;
          const seat = group.getObjects()[0] as fabric.Rect;
          const text = group.getObjects()[1] as fabric.IText;

          if (text.text && seatsTaken.includes(text.text)) {
            seat.fill = '#bfbdbd';
            text.fill = '#000',
              group.selectable = false;
            group.dirty = true;
          }
        }
      });

      this.canvas?.renderAll();
    }
  }

  centerViewportOnScreen(screenText: fabric.Text) {
    if (screenText.left && screenText.top) {
      const zoomLevel = 1.1;
      const objectLeft = screenText.left;
      const objectTop = screenText.top;

      const newLeft = (-objectLeft * zoomLevel) + this.canvas!.width! / 2 - HALF_SCREEN;
      const newTop = (-objectTop * zoomLevel);

      this.canvas?.setViewportTransform([zoomLevel, 0, 0, zoomLevel, newLeft, newTop]);
    }
  }

  resetActionState() {
    this.undoStack = [];
    this.redoStack = [];
    this.isUndoDisabled = true;
    this.isRedoDisabled = true;
  }

  resizeCanvas() {
    const width = this.canvasContainer?.nativeElement.offsetWidth;
    const height = this.canvasContainer?.nativeElement.offsetHeight;
    this.canvas?.setWidth(width);
    this.canvas?.setHeight(height);
  }

  @HostListener('window:keyup.delete')
  delete() {
    if (this.creativeMode) {
      const selected = this.canvas?.getActiveObjects() ?? [];
      this.canvas?.remove(...selected);
      this.totSeats -= selected.length;
      this.canvas?.requestRenderAll();
      this.saveState();
    }
  }

  @HostListener('window:keydown.control.z')
  undo() {
    if (this.creativeMode && !this.isUndoDisabled) {
      this.replay(true);
    }
  }

  @HostListener('window:keydown.control.y')
  redo() {
    if (this.creativeMode && !this.isRedoDisabled) {
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

  setSelectedSeatToEdit(opt: fabric.IEvent<MouseEvent>) {
    if (opt.selected && opt.selected.length === 1) {
      this.selectedSeat = opt.selected[0] as fabric.Group;
      const text = this.selectedSeat.getObjects()[1] as fabric.IText;
      this.editSeatForm.patchValue({
        label: text.text
      });
    }
  }

  setSelectedSeatToBook(opt: fabric.IEvent<MouseEvent>) {
    if (opt.selected) {
      const group = opt.selected[0] as fabric.Group;
      const seat = group.getObjects()[0] as fabric.Rect;
      const text = group.getObjects()[1] as fabric.IText;

      if (text.text) {
        const index = this.selectedSeatsInternal.findIndex(t => t === text.text);

        if (index > -1) {
          seat.fill = '#8a74a5';
          group.dirty = true;
          this.selectedSeatsInternal.splice(index, 1);
        } else {
          seat.fill = '#620dff';
          group.dirty = true;
          this.selectedSeatsInternal.push(text.text);
        }

        this.selectedSeats.emit(this.selectedSeatsInternal);
        this.canvas?.discardActiveObject();
        this.canvas?.renderAll();
      }
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
    this.onSave.emit({
      ...this.screenForm.value,
      json: JSON.stringify(this.canvas),
    })
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
          fill: '#8a74a5',
          originX: 'center',
          originY: 'center',
          width: SEAT_SIZE,
          height: SEAT_SIZE,
        });

        var text = new fabric.Text(rowLabel + "-" + (j + 1), {
          fontSize: 10,
          fontWeight: 'bold',
          fontFamily: 'Montserrat, sans-serif',
          fill: "#fff",
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
