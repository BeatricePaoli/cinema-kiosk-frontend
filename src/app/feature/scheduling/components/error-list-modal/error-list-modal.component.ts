import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';



export interface ErrorListModalData {
  schedulings: any[];
}

@Component({
  selector: 'app-error-list-modal',
  templateUrl: './error-list-modal.component.html',
  styleUrls: ['./error-list-modal.component.scss']
})
export class ErrorListModalComponent {

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  schedulings: any[] = [];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['date', 'movie', 'screen', 'projectionType', 'language', 'shows'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ErrorListModalData, 
    public dialogRef: MatDialogRef<ErrorListModalComponent>,
  ) {
    this.schedulings = data.schedulings;
    this.initTable();
  }

  initTable() {
    this.dataSource = new MatTableDataSource(this.schedulings);
    this.dataSource.paginator = this.paginator!;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
