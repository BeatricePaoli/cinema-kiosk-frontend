import { createFeature, createReducer, on } from '@ngrx/store';
import { BookingListActions } from '../actions/booking-list.actions';
import { Booking } from 'src/app/core/models/booking';
import { Toast, ToastStatus } from 'src/app/core/models/toast';

export const bookingListFeatureKey = 'bookingList';

export interface State {
  toast: Toast | null;
  isLoading: boolean;
  bookings: Booking[],
}

export const initialState: State = {
  toast: null,
  isLoading: false,
  bookings: [],
};

export const reducer = createReducer(
  initialState,
  on(BookingListActions.loadBookingLists, (state) => {
    return {
      ...state,
      isLoading: true,
    }
  }),
  on(BookingListActions.loadBookingListsSuccess, (state, { response }) => {
    return {
      ...state,
      isLoading: false,
      bookings: response,
    }
  }),
  on(BookingListActions.loadBookingListsFailure, (state) => {
    return {
      ...state,
      toast: {
        message: "Errore durante il recupero delle prenotazioni.",
        status: ToastStatus.ERROR,
      },
      isLoading: false,
    };
  }),
  on(BookingListActions.deleteBooking, (state) => {
    return {
      ...state,
      isLoading: true,
    }
  }),
  on(BookingListActions.deleteBookingSuccess, (state) => {
    return {
      ...state,
      toast: {
        message: "Prenotazione cancellata.",
        status: ToastStatus.SUCCESS,
      },
      isLoading: false,
    }
  }),
  on(BookingListActions.deleteBookingFailure, (state) => {
    return {
      ...state,
      toast: {
        message: "Errore durante il recupero delle prenotazioni.",
        status: ToastStatus.ERROR,
      },
      isLoading: false,
    };
  }),
);

export const bookingListFeature = createFeature({
  name: bookingListFeatureKey,
  reducer,
});

