import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { ActionModalComponent, ActionModalData, ActionModalOutput } from 'src/app/shared/components/action-modal/action-modal.component';

@Component({
  selector: 'app-theater-list',
  templateUrl: './theater-list.component.html',
  styleUrls: ['./theater-list.component.scss']
})
export class TheaterListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  theaters: any[] = [
    {
      id: 1,
      name: "Cinema 1",
      address: {
        id: 1,
        street: "Via Pinco Pallino",
        number: "8",
        city: "Firenze",
        country: "Italia"
      },
      screens: [
        {
          id: 1,
          name: "Sala a"
        },
        {
          id: 2,
          name: "Sala b"
        }
      ]
    },
    {
      id: 2,
      name: "Cinema 2",
      address: {
        id: 1,
        street: "Via Pinco Pallino",
        number: "8",
        city: "Firenze",
        country: "Italia"
      },
      screens: [
        {
          id: 1,
          name: "Sala a"
        },
        {
          id: 2,
          name: "Sala b"
        }
      ]
    }
  ]

  displayedColumns: string[] = ['name', 'address', 'screens', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initTable();
  }

  initTable() {
    this.dataSource = new MatTableDataSource(this.theaters);
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
  }

  onCancelClicked(theater: any) {
    this.dialog.open<ActionModalComponent, ActionModalData, ActionModalOutput>(ActionModalComponent, {
      height: '50vh',
      data: {
        title: "Conferma cancellazione",
        content: `Sei sicuro di voler cancellare il cinema ${theater.name}?`,
        backBtn: "Annulla",
        confirmBtn: "Cancella",
      },
    }).afterClosed().pipe(take(1)).subscribe(output => {
      if (output?.result) {
        const index = this.theaters.findIndex(t => t.id === theater.id);
        if (index > -1) {
          this.theaters.splice(index, 1);
        }

        this.initTable();
      }
    });
  }

}
