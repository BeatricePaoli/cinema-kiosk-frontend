import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { BookingFormActions } from '../actions/booking-form.actions';


@Injectable()
export class BookingFormEffects {

  loadBookingForms$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(BookingFormActions.loadBookingForms),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => BookingFormActions.loadBookingFormsSuccess({ data })),
          catchError(error => of(BookingFormActions.loadBookingFormsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
