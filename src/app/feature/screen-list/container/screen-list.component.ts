import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import * as RouterSelectors from 'src/app/core/router/router.selectors';
import { ActionModalComponent, ActionModalData, ActionModalOutput } from 'src/app/shared/components/action-modal/action-modal.component';


@Component({
  selector: 'app-screen-list',
  templateUrl: './screen-list.component.html',
  styleUrls: ['./screen-list.component.scss']
})
export class ScreenListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  theaterId?: number;
  theater: any = {
    id: 1,
    name: "Cinema 1",
  };

  screens: any[] = [
    {
      id: 1,
      name: "Sala a",
      emitterSerial: "ABCD89",
      totalSeats: 140
    },
    {
      id: 2,
      name: "Sala b",
      emitterSerial: "ABCD12",
      totalSeats: 245
    }
  ];

  displayedColumns: string[] = ['name', 'emitterSerial', 'totalSeats', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  constructor(private store: Store, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.store.select(RouterSelectors.selectParams).pipe(take(1)).subscribe(params => {
      if (params && params.theaterId) {
        this.theaterId = params.theaterId;

        this.initTable();
      }
    });
  }

  initTable() {
    this.dataSource = new MatTableDataSource(this.screens);
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
  }

  onCancelClicked(screen: any) {
    this.dialog.open<ActionModalComponent, ActionModalData, ActionModalOutput>(ActionModalComponent, {
      height: '50vh',
      data: {
        title: "Conferma cancellazione",
        content: `Sei sicuro di voler cancellare la sala ${screen.name}?`,
        backBtn: "Annulla",
        confirmBtn: "Cancella",
      },
    }).afterClosed().pipe(take(1)).subscribe(output => {
      if (output?.result) {
        this.screens = this.screens.filter((s: any) => s.id === screen.id);
        this.initTable();
      }
    });
  }

}
