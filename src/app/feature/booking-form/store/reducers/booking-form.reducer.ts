import { createFeature, createReducer, on } from '@ngrx/store';
import { BookingFormActions } from '../actions/booking-form.actions';
import { Toast, ToastStatus } from 'src/app/core/models/toast';
import { Movie } from 'src/app/core/models/movie';
import { AutocompleteTheaterFilter } from 'src/app/core/models/theater';
import { Show } from 'src/app/core/models/show';
import { TicketType } from 'src/app/core/models/tickets';

export const bookingFormFeatureKey = 'bookingForm';

export interface State {
  toast: Toast | null;
  isLoading: boolean;
  movie: Movie | null;
  filter: AutocompleteTheaterFilter | null;
  shows: Show[];
  ticketTypes: TicketType[];
}

export const initialState: State = {
  toast: null,
  isLoading: false,
  movie: null,
  filter: null,
  shows: [],
  ticketTypes: [],
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
  on(BookingFormActions.loadShowsList, (state) => {
    return {
      ...state,
      isLoading: true,
    }
  }),
  on(BookingFormActions.loadShowsListSuccess, (state, { response }) => {
    return {
      ...state,
      isLoading: false,
      shows: response,
    }
  }),
  on(BookingFormActions.loadShowsListFailure, (state) => {
    return {
      ...state,
      toast: {
        message: "Errore durante il recupero degli spettacoli.",
        status: ToastStatus.ERROR,
      },
      isLoading: false,
    };
  }),
  on(BookingFormActions.loadTicketTypesList, (state) => {
    return {
      ...state,
      isLoading: true,
    }
  }),
  on(BookingFormActions.loadTicketTypesListSuccess, (state, { response }) => {
    return {
      ...state,
      isLoading: false,
      ticketTypes: response,
    }
  }),
  on(BookingFormActions.loadTicketTypesListFailure, (state) => {
    return {
      ...state,
      toast: {
        message: "Errore durante il recupero delle tipologie di biglietti.",
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

