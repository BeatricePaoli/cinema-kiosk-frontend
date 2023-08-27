import { createFeature, createReducer, on } from '@ngrx/store';
import { BookingValidatorActions } from '../actions/booking-validator.actions';
import { Toast, ToastStatus } from 'src/app/core/models/toast';
import { Booking } from 'src/app/core/models/booking';

export const bookingValidatorFeatureKey = 'bookingValidator';

export interface State {
  toast: Toast | null;
  isLoading: boolean;
  booking: Booking | null,
}

export const initialState: State = {
  toast: null,
  isLoading: false,
  booking: null,
};

export const reducer = createReducer(
  initialState,
  on(BookingValidatorActions.loadBooking, (state) => {
    return {
      ...state,
      isLoading: true,
    }
  }),
  on(BookingValidatorActions.loadBookingSuccess, (state, { response }) => {
    return {
      ...state,
      isLoading: false,
      booking: response,
    }
  }),
  on(BookingValidatorActions.loadBookingFailure, (state) => {
    return {
      ...state,
      toast: {
        message: "Errore durante il recupero dello status della prenotazione.",
        status: ToastStatus.ERROR,
      },
      isLoading: false,
    };
  }),
  on(BookingValidatorActions.validateBooking, (state) => {
    return {
      ...state,
      isLoading: true,
    }
  }),
  on(BookingValidatorActions.validateBookingSuccess, (state) => {
    return {
      ...state,
      toast: {
        message: "Prenotazione validata.",
        status: ToastStatus.SUCCESS,
      },
      isLoading: false,
    }
  }),
  on(BookingValidatorActions.validateBookingFailure, (state) => {
    return {
      ...state,
      toast: {
        message: "Impossibile validare la prenotazione.",
        status: ToastStatus.ERROR,
      },
      isLoading: false,
    };
  }),
  on(BookingValidatorActions.resetBooking, (state) => {
    return {
      ...state,
      booking: null,
    }
  }),
);

export const bookingValidatorFeature = createFeature({
  name: bookingValidatorFeatureKey,
  reducer,
});

