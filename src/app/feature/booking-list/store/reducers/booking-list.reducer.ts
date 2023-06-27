import { createFeature, createReducer, on } from '@ngrx/store';
import { BookingListActions } from '../actions/booking-list.actions';

export const bookingListFeatureKey = 'bookingList';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(BookingListActions.loadBookingLists, state => state),
  on(BookingListActions.loadBookingListsSuccess, (state, action) => state),
  on(BookingListActions.loadBookingListsFailure, (state, action) => state),
);

export const bookingListFeature = createFeature({
  name: bookingListFeatureKey,
  reducer,
});

