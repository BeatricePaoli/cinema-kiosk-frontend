import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { BookingListActions } from '../actions/booking-list.actions';


@Injectable()
export class BookingListEffects {

  loadBookingLists$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(BookingListActions.loadBookingLists),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => BookingListActions.loadBookingListsSuccess({ data })),
          catchError(error => of(BookingListActions.loadBookingListsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
