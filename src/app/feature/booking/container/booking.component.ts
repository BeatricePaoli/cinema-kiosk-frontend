import { Component } from '@angular/core';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {

  booking = {
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
  };

}
