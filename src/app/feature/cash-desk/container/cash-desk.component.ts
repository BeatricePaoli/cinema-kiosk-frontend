import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cash-desk',
  templateUrl: './cash-desk.component.html',
  styleUrls: ['./cash-desk.component.scss']
})
export class CashDeskComponent implements OnInit {

  shows: any[] = [
    {
      id: 1,
      date: "2023-06-19T22:00:00.000Z",
      projectionType: "3D",
      language: "Italiano",
      movie: {
        id: 1,
        name: "Spider-man: Across the Spiderverse",
      },
      screen: {
        id: 1,
        name: "Sala a",
        totalSeats: 140
      },
      startTime: "17:30",
      endTime: "19:30",
      tickets: [
        {
          id: 1,
          name: "Adulti",
          price: 9
        },
        {
          id: 2,
          name: "Bambini",
          price: 7
        },
        {
          id: 3,
          name: "Convenzione a",
          price: 5
        }
      ],
      bookedTickets: 20,
    },
    {
      id: 2,
      date: "2023-06-19T22:00:00.000Z",
      projectionType: "3D",
      language: "Italiano",
      movie: {
        id: 2,
        name: "Elemental",
      },
      screen: {
        id: 2,
        name: "Sala b",
        totalSeats: 100
      },
      startTime: "17:30",
      endTime: "19:30",
      tickets: [
        {
          id: 1,
          name: "Adulti",
          price: 9
        },
        {
          id: 2,
          name: "Bambini",
          price: 7
        },
        {
          id: 3,
          name: "Convenzione a",
          price: 5
        }
      ],
      bookedTickets: 70,
    },
    {
      id: 3,
      date: "2023-06-19T23:00:00.000Z",
      projectionType: "3D",
      language: "Italiano",
      movie: {
        id: 1,
        name: "Spider-man: Across the Spiderverse",
      },
      screen: {
        id: 1,
        name: "Sala a",
        totalSeats: 140
      },
      startTime: "17:30",
      endTime: "19:30",
      tickets: [
        {
          id: 1,
          name: "Adulti",
          price: 9
        },
        {
          id: 2,
          name: "Bambini",
          price: 7
        },
        {
          id: 3,
          name: "Convenzione a",
          price: 5
        }
      ],
      bookedTickets: 140,
    }
  ];

  selectedShow: any = this.shows[0];

  ticketsForm = new FormGroup({
    tickets: new FormArray([])
  });

  price: number = 0;
  totalSeatsError: boolean = false;

  subs: Subscription[] = [];

  get tickets() {
    return (this.ticketsForm.get('tickets') as FormArray);
  }

  ngOnInit(): void {
    this.initTicketsForm();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  initTicketsForm() {
    this.tickets.clear();
    this.selectedShow.tickets.forEach((ticket: any) => {
      this.tickets.push(
        new FormGroup({
          name: new FormControl(ticket.name),
          price: new FormControl(ticket.price),
          quantity: new FormControl(0),
          totalPrice: new FormControl(0),
        })
      );

      this.subs.push(this.tickets.valueChanges.subscribe((values: any[]) => {
        this.price = values.reduce((sum, value) => sum + (value.price * value.quantity), 0);

        values.forEach((value, i) => {
          if (value.price * value.quantity !== value.totalPrice) {
            this.tickets.at(i).patchValue({
              totalPrice: value.price * value.quantity
            });
          }
        });

        const seatsToBook = values.reduce((sum, value) => sum + value.quantity, 0);
        this.totalSeatsError = this.selectedShow.bookedTickets + seatsToBook >= this.selectedShow.screen.totalSeats;
      }));
    });
  }

  onSelectShow(show: any) {
    this.selectedShow = show;
    this.initTicketsForm();
  }

  getColorClass(show: any) {
    const perc = show.bookedTickets * 100 / show.screen.totalSeats;
    if (perc <= 50) {
      return 'green';
    } else if (show.bookedTickets < show.screen.totalSeats) {
      return 'orange';
    } else {
      return 'red';
    }
  }

  getTicketsControls() {
    return this.tickets.controls as FormControl[];
  }

  getTicketProperty(fc: FormControl, prop: string) {
    return fc.get(prop)! as FormControl;
  }

  onSubmit() {
    console.log(this.tickets.value)
  }

}
