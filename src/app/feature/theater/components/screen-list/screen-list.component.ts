import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-screen-list',
  templateUrl: './screen-list.component.html',
  styleUrls: ['./screen-list.component.scss']
})
export class ScreenListComponent implements OnChanges, AfterViewInit {

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  @Input()
  screens: any[] = [];

  @Output()
  onDelete: EventEmitter<any> = new EventEmitter<any>();

  displayedColumns: string[] = ['name', 'totalSeats', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  ngAfterViewInit(): void {
    this.initTable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['screens'] && changes['screens'].currentValue) {
      this.initTable();
    }
  }

  initTable() {
    this.dataSource = new MatTableDataSource(this.screens);
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
  }

  onCancelClicked(screen: any) {
    this.onDelete.emit(screen);
  }

}
