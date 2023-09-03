import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-bar-table',
  templateUrl: './bar-table.component.html',
  styleUrls: ['./bar-table.component.scss']
})
export class BarTableComponent implements OnChanges {

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  @Input()
  barsList: any[] = [];

  @Output()
  onSave: EventEmitter<any> = new EventEmitter<any>();

  barForm = new FormGroup({
    bars: new FormArray([])
  });

  displayedColumns: string[] = ['name', 'emitterSerial', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  get bars() {
    return (this.barForm.get('bars') as FormArray);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['barsList'] && changes['barsList'].currentValue) {
      const barsList = changes['barsList'].currentValue;
      this.bars.patchValue([]);

      barsList.forEach((bar: any) => {
        this.pushForm(bar);
      });

      this.initTable();
    }
  }

  initTable() {
    this.dataSource = new MatTableDataSource(this.bars.controls);
    this.dataSource.paginator = this.paginator!;
  }

  pushForm(bar?: any) {
    this.bars.push(
      new FormGroup({
        name: new FormControl(bar ? bar.name : null, Validators.required),
        emitterSerial: new FormControl(bar ? bar.emitterSerial : null, Validators.required),
      })
    );
  }

  onAddClicked() {
    this.pushForm();
    this.initTable();
  }

  getErrorRequired(fc: FormControl) {
    return fc?.errors ? fc.errors!['required'] : null;
  }

  onCancelClicked(index: number) {
    this.bars.removeAt(index);
    this.initTable();
  }

  onSubmit() {
    this.onSave.emit(this.bars.value);
  }

}
