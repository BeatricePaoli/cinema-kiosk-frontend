import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, of, take } from 'rxjs';
import { Booking } from 'src/app/core/models/booking';
import { Toast } from 'src/app/core/models/toast';
import * as RouterSelectors from 'src/app/core/router/router.selectors';
import { BookingActions } from '../store/actions/booking.actions';
import * as BookingSelectors from '../store/selectors/booking.selectors';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  booking: Booking | null = null;

  isLoading$: Observable<boolean> = of(false);
  toast$: Observable<Toast | null> = of(null);

  subs: Subscription[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(RouterSelectors.selectParams).pipe(take(1)).subscribe(params => {
      if (params && params.bookingId) {
        this.store.dispatch(BookingActions.loadBooking({id: params.bookingId }));
      }
    });

    this.isLoading$ = this.store.select(BookingSelectors.selectIsLoading);
    this.toast$ = this.store.select(BookingSelectors.selectToast);

    this.subs.push(this.store.select(BookingSelectors.selectBooking).subscribe(booking => {
      this.booking = booking;
    }))
  }

}
