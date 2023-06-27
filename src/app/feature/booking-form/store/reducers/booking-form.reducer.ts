import { createFeature, createReducer, on } from '@ngrx/store';
import { BookingFormActions } from '../actions/booking-form.actions';

export const bookingFormFeatureKey = 'bookingForm';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(BookingFormActions.loadBookingForms, state => state),
  on(BookingFormActions.loadBookingFormsSuccess, (state, action) => state),
  on(BookingFormActions.loadBookingFormsFailure, (state, action) => state),
);

export const bookingFormFeature = createFeature({
  name: bookingFormFeatureKey,
  reducer,
});

