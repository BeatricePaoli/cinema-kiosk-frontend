import { Component, Input } from '@angular/core';
import { Booking } from 'src/app/core/models/booking';


@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.scss']
})
export class BookingSummaryComponent {

  @Input()
  booking: Booking | null = null;

  @Input()
  toComplete: boolean = false;

  constructor() {}

  getSeatsString() {
    return this.booking?.seats.map(s => s.label).join(", ");
  }

}
