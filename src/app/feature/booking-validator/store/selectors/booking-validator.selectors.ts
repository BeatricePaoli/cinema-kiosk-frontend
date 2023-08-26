import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBookingValidator from '../reducers/booking-validator.reducer';

export const selectBookingValidatorState = createFeatureSelector<fromBookingValidator.State>(
  fromBookingValidator.bookingValidatorFeatureKey
);
