import { AfterViewInit, Component, ElementRef, HostListener, NgZone, OnInit, ViewChild } from '@angular/core';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { fabric } from 'fabric';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export const SEAT_SIZE = 20;
export const PADDING = 5;
export const SCREEN_PADDING = 80;

@Component({
  selector: 'app-seats-editor',
  templateUrl: './seats-editor.component.html',
  styleUrls: ['./seats-editor.component.scss']
})
export class SeatsEditorComponent implements OnInit /*, AfterViewInit */ {

  @ViewChild('canvasContainer')
  canvasContainer?: ElementRef;

  canvas?: fabric.Canvas;

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
  addSeatsForm = new FormGroup({
    blockRows: new FormControl(0, [Validators.required, Validators.min(1)]),
    blockCols: new FormControl(0, [Validators.required, Validators.min(1)]),
  });

  constructor(private zone: NgZone,
    // private viewportRuler: ViewportRuler
  ) { }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.canvas = new fabric.Canvas('fabricSurface', {
        selection: true,
        preserveObjectStacking: true,
        backgroundColor: "transparent"
      });

      var screen = new fabric.Text("Schermo", {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Montserrat',
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
    });

    this.canvas?.on('mouse:up', () => {
      if (this.canvas?.viewportTransform && this.isDragging) {
        this.canvas?.setViewportTransform(this.canvas?.viewportTransform);
        this.isDragging = false;
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
    // this.viewportRuler.change(200).subscribe(() => this.zone.run(() => {
    //   this.resizeCanvas();
    // }));
  }

  @HostListener('window:keyup.delete')
  delete() {
    const selected = this.canvas?.getActiveObjects() ?? [];
    this.canvas?.remove(...selected);
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

  onCreateBlock() {
    const { blockRows, blockCols } = this.addSeatsForm.value;

    if (blockRows && blockCols) {
      for (let i = 0; i < blockRows; i++) {

        // lettere maiuscole
        const letter = String.fromCharCode(65 + i % 26);
        const rowLabel = i < 26 ? letter : letter + Math.trunc(i / 26);

        const rowHeight = SCREEN_PADDING + (SEAT_SIZE + PADDING * 2) * i;

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
            fontFamily: 'Montserrat',
            originX: 'center',
            originY: 'center',
            selectable: false,
          });

          var seat = new fabric.Group([rect, text], {
            left: PADDING + j * (PADDING + SEAT_SIZE),
            top: rowHeight,
          });
          this.canvas?.add(seat);
        }
      }

      this.saveState();
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

  // ngAfterViewInit(): void {
  //   this.resizeCanvas();
  // }

  // resizeCanvas() {
  //   const width = this.canvasContainer?.nativeElement.offsetWidth;
  //   const height = this.canvasContainer?.nativeElement.offsetHeight;
  //   this.canvas?.setWidth(width);
  //   this.canvas?.setHeight(height);
  //   // this.canvas?.renderAll();
  // }
}
