import { createFeature, createReducer, on } from '@ngrx/store';
import { BookingFormActions } from '../actions/booking-form.actions';
import { Toast, ToastStatus } from 'src/app/core/models/toast';
import { Movie } from 'src/app/core/models/movie';
import { TheaterFilter } from 'src/app/core/models/theater';

export const bookingFormFeatureKey = 'bookingForm';

export interface State {
  toast: Toast | null;
  isLoading: boolean;
  movie: Movie | null;
  filter: TheaterFilter | null;
}

export const initialState: State = {
  toast: null,
  isLoading: false,
  movie: null,
  filter: null,
};

export const reducer = createReducer(
  initialState,
  on(BookingFormActions.loadFilter, (state) => {
    return {
      ...state,
    }
  }),
  on(BookingFormActions.loadFilterSuccess, (state, { response }) => {
    return {
      ...state,
      filter: response,
    }
  }),
  on(BookingFormActions.loadFilterFailure, (state) => {
    return {
      ...state,
      toast: {
        message: "Errore durante il recupero dei filtri.",
        status: ToastStatus.ERROR,
      },
    };
  }),
  on(BookingFormActions.loadMovie, (state) => {
    return {
      ...state,
      isLoading: true,
    }
  }),
  on(BookingFormActions.loadMovieSuccess, (state, { response }) => {
    return {
      ...state,
      isLoading: false,
      movie: response,
    }
  }),
  on(BookingFormActions.loadMovieFailure, (state) => {
    return {
      ...state,
      toast: {
        message: "Errore durante il recupero del film.",
        status: ToastStatus.ERROR,
      },
      isLoading: false,
    };
  }),
);

export const bookingFormFeature = createFeature({
  name: bookingFormFeatureKey,
  reducer,
});

