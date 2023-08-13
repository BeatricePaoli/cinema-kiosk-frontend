import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBooking from '../reducers/booking.reducer';

export const selectBookingState = createFeatureSelector<fromBooking.State>(
  fromBooking.bookingFeatureKey
);

export const selectToast = createSelector(
  selectBookingState,
  (state: fromBooking.State) => {
    return state?.toast;
  }
);

export const selectIsLoading = createSelector(
  selectBookingState,
  (state: fromBooking.State) => {
    return state?.isLoading;
  }
);

export const selectBooking = createSelector(
  selectBookingState,
  (state: fromBooking.State) => {
    return state?.booking;
  }
);