import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBookingList from '../reducers/booking-list.reducer';

export const selectBookingListState = createFeatureSelector<fromBookingList.State>(
  fromBookingList.bookingListFeatureKey
);
