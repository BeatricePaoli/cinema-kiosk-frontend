import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BookingService } from 'src/app/core/services/booking/booking.service';
import { BookingActions } from '../actions/booking.actions';


@Injectable()
export class BookingEffects {

  loadBooking$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(BookingActions.loadBooking),
      switchMap((action) => this.bookingService.getBooking(action.id)
        .pipe(
          map(data => BookingActions.loadBookingSuccess({ response: data })),
          catchError(error => of(BookingActions.loadBookingFailure())))
      )
    );
  });


  constructor(private actions$: Actions,
    private bookingService: BookingService) {}
}
