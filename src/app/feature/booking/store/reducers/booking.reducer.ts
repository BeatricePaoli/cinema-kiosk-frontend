import { createFeature, createReducer, on } from '@ngrx/store';
import { BookingActions } from '../actions/booking.actions';
import { Booking } from 'src/app/core/models/booking';
import { Toast, ToastStatus } from 'src/app/core/models/toast';

export const bookingFeatureKey = 'booking';

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
  on(BookingActions.loadBooking, (state) => {
    return {
      ...state,
      isLoading: true,
    }
  }),
  on(BookingActions.loadBookingSuccess, (state, { response }) => {
    return {
      ...state,
      isLoading: false,
      booking: response,
    }
  }),
  on(BookingActions.loadBookingFailure, (state) => {
    return {
      ...state,
      toast: {
        message: "Errore durante il recupero della prenotazione.",
        status: ToastStatus.ERROR,
      },
      isLoading: false,
    };
  }),
);

export const bookingFeature = createFeature({
  name: bookingFeatureKey,
  reducer,
});

