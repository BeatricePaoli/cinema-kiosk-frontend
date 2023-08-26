import { createFeature, createReducer, on } from '@ngrx/store';
import { BookingValidatorActions } from '../actions/booking-validator.actions';

export const bookingValidatorFeatureKey = 'bookingValidator';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(BookingValidatorActions.loadBookingValidators, state => state),
  on(BookingValidatorActions.loadBookingValidatorsSuccess, (state, action) => state),
  on(BookingValidatorActions.loadBookingValidatorsFailure, (state, action) => state),
);

export const bookingValidatorFeature = createFeature({
  name: bookingValidatorFeatureKey,
  reducer,
});

