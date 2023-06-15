import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { BookingActions } from '../actions/booking.actions';


@Injectable()
export class BookingEffects {

  loadBookings$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(BookingActions.loadBookings),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => BookingActions.loadBookingsSuccess({ data })),
          catchError(error => of(BookingActions.loadBookingsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
