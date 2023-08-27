import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { BookingValidatorActions } from '../actions/booking-validator.actions';
import { BookingService } from 'src/app/core/services/booking/booking.service';


@Injectable()
export class BookingValidatorEffects {

  loadBooking$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(BookingValidatorActions.loadBooking),
      switchMap((action) => this.bookingService.getBooking(action.id)
        .pipe(
          map(data => BookingValidatorActions.loadBookingSuccess({ response: data })),
          catchError(error => of(BookingValidatorActions.loadBookingFailure())))
      )
    );
  });

  validateBooking$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(BookingValidatorActions.validateBooking),
      switchMap((action) => this.bookingService.validateBooking(action.id)
        .pipe(
          map(data => BookingValidatorActions.validateBookingSuccessAndReload({ id: action.id })),
          catchError(error => of(BookingValidatorActions.validateBookingFailure())))
      )
    );
  });

  setSuccessToastOnValidate$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(BookingValidatorActions.validateBookingSuccessAndReload),
      map(action => BookingValidatorActions.validateBookingSuccess()),
    );
  });
  reloadBookingOnValidate$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(BookingValidatorActions.validateBookingSuccessAndReload),
      map(action => BookingValidatorActions.loadBooking({ id: action.id })),
    );
  });


  constructor(private actions$: Actions, private bookingService: BookingService) {}
}
