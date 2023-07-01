import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CollapseAnimation } from 'src/app/core/animations/collapse.animation';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],
  animations: [CollapseAnimation],
})
export class BookingListComponent {

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  bookings: any[] = [
    {
      city: "One",
      cinema: "Two",
      projectionType: "3D",
      language: "Italiano",
      date: "2023-06-19T22:00:00.000Z",
      showId: 1,
      tickets: [
        {
          name: "Adulti",
          quantity: 1
        },
        {
          name: "Bambini",
          quantity: 1
        }
      ],
      seats: [
        "A-3"
      ],
      startTime: "17:30",
      price: 19,
      movie: {
        id: 1,
        name: "Spider-man: Across the Spiderverse",
        img: "https://cinemaadriano.it/images/locandine_film/spider.jpg"
      },
      barcode: 'assets/mocks/barcode.gif'
    },
    {
      city: "One",
      cinema: "Two",
      projectionType: "3D",
      language: "Italiano",
      date: "2023-06-17T22:00:00.000Z",
      showId: 1,
      adultsSeats: 2,
      childrenSeats: null,
      seats: [
        "A-3"
      ],
      startTime: "17:30",
      price: 9,
      movie: {
        id: 1,
        name: "Elemental",
        img: "https://cinemaadriano.it/images/locandine_film/elemental.jpg"
      },
      barcode: 'assets/mocks/barcode.gif'
    },
    {
      city: "One",
      cinema: "Two",
      projectionType: "3D",
      language: "Italiano",
      date: "2023-06-15T22:00:00.000Z",
      showId: 1,
      adultsSeats: 1,
      childrenSeats: null,
      seats: [
        "A-3"
      ],
      startTime: "17:30",
      price: 9,
      movie: {
        id: 1,
        name: "Spider-man: Across the Spiderverse",
        img: "https://cinemaadriano.it/images/locandine_film/spider.jpg"
      },
      barcode: 'assets/mocks/barcode.gif'
    }
  ];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  columnsToDisplay = ['date', 'movie', 'price'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: any | null;

  ngAfterViewInit() {
    this.initTable();
  }

  initTable() {
    this.dataSource = new MatTableDataSource(this.bookings);
    this.dataSource.paginator = this.paginator!;
  }

}
