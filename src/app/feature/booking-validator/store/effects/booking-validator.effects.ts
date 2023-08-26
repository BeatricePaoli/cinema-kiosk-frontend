import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { BookingValidatorActions } from '../actions/booking-validator.actions';


@Injectable()
export class BookingValidatorEffects {

  loadBookingValidators$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(BookingValidatorActions.loadBookingValidators),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => BookingValidatorActions.loadBookingValidatorsSuccess({ data })),
          catchError(error => of(BookingValidatorActions.loadBookingValidatorsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
