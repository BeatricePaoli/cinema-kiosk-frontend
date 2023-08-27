import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBookingValidator from '../reducers/booking-validator.reducer';

export const selectBookingValidatorState = createFeatureSelector<fromBookingValidator.State>(
  fromBookingValidator.bookingValidatorFeatureKey
);

export const selectToast = createSelector(
  selectBookingValidatorState,
  (state: fromBookingValidator.State) => {
    return state?.toast;
  }
);

export const selectIsLoading = createSelector(
  selectBookingValidatorState,
  (state: fromBookingValidator.State) => {
    return state?.isLoading;
  }
);

export const selectBooking = createSelector(
  selectBookingValidatorState,
  (state: fromBookingValidator.State) => {
    return state?.booking;
  }
);