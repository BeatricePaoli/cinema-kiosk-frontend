import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBookingForm from '../reducers/booking-form.reducer';

export const selectBookingFormState = createFeatureSelector<fromBookingForm.State>(
  fromBookingForm.bookingFormFeatureKey
);
