import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BookingService } from 'src/app/core/services/booking/booking.service';
import { BookingListActions } from '../actions/booking-list.actions';


@Injectable()
export class BookingListEffects {

  loadBookingList$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(BookingListActions.loadBookingLists),
      switchMap((action) => this.bookingService.getBookings()
        .pipe(
          map(data => BookingListActions.loadBookingListsSuccess({ response: data })),
          catchError(error => of(BookingListActions.loadBookingListsFailure())))
      )
    );
  });


  constructor(private actions$: Actions,
    private bookingService: BookingService) {}
}
