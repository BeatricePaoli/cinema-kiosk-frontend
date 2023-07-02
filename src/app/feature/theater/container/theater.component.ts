import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import * as RouterSelectors from 'src/app/core/router/router.selectors';
import { ActionModalComponent, ActionModalData, ActionModalOutput } from 'src/app/shared/components/action-modal/action-modal.component';

@Component({
  selector: 'app-theater',
  templateUrl: './theater.component.html',
  styleUrls: ['./theater.component.scss']
})
export class TheaterComponent implements OnInit {

  theaterId?: number;

  theater: any;

  constructor(private store: Store, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.store.select(RouterSelectors.selectParams).pipe(take(1)).subscribe(params => {
      if (params && params.theaterId) {
        const id = parseInt(params.theaterId);
        if (!Number.isNaN(id)) {
          this.theaterId = id;

          this.theater = {
            id: 1,
            name: "Cinema 1",
            address: {
              id: 1,
              street: "Via Pinco Pallino",
              number: "8",
              city: "Firenze",
              country: "Italia",
              zipCode: 10000
            },
            screens: [
              {
                id: 1,
                name: "Sala a",
                totalSeats: 140
              },
              {
                id: 2,
                name: "Sala b",
                totalSeats: 245
              }
            ],
            tickets: [
              {
                id: 1,
                name: "Adulti",
                price: 9,
                projectionType: "2D",
                availableOnline: true,
                days: [0, 1, 2, 3, 4, 5, 6, 7],
                fromTime: "14:00",
                toTime: "23:59"
              },
              {
                id: 2,
                name: "Bambini",
                price: 7,
                projectionType: "2D",
                availableOnline: true,
                days: [0, 1, 2, 3, 4, 5, 6, 7],
                fromTime: "14:00",
                toTime: "23:59"
              },
              {
                id: 3,
                name: "Sconto a",
                price: 4.5,
                projectionType: "2D",
                availableOnline: false,
                days: [2],
                fromTime: "14:00",
                toTime: "19:00"
              }
            ]
          };

        }
      }
    })
  }

  onTheaterSubmit(formValues: any) {
    console.log(formValues);
  }

  onScreenDelete(screen: any) {
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
        this.theater.screens = this.theater.screens.filter((s: any) => s.id === screen.id);
      }
    });
  }

  onTicketsSubmit(formValues: any) {
    console.log(formValues);
  }

}
