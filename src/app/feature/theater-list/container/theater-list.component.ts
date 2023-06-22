import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-theater-list',
  templateUrl: './theater-list.component.html',
  styleUrls: ['./theater-list.component.scss'],
  encapsulation: ViewEncapsulation.None
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
        city: "Firenze"
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
        city: "Firenze"
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

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.theaters);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
  }

}
