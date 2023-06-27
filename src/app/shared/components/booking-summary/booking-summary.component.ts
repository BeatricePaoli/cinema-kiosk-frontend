import { Component, Input } from '@angular/core';
import * as _moment from 'moment';

const moment = _moment;


@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.scss']
})
export class BookingSummaryComponent {

  @Input()
  booking: any;

  @Input()
  toComplete: boolean = false;

}
