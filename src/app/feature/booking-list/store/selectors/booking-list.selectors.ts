import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBookingList from '../reducers/booking-list.reducer';

export const selectBookingListState = createFeatureSelector<fromBookingList.State>(
  fromBookingList.bookingListFeatureKey
);

export const selectToast = createSelector(
  selectBookingListState,
  (state: fromBookingList.State) => {
    return state?.toast;
  }
);

export const selectIsLoading = createSelector(
  selectBookingListState,
  (state: fromBookingList.State) => {
    return state?.isLoading;
  }
);

export const selectBookings = createSelector(
  selectBookingListState,
  (state: fromBookingList.State) => {
    return state?.bookings;
  }
);