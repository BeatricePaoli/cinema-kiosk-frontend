import { createFeature, createReducer, on } from '@ngrx/store';
import { TheaterActions } from '../actions/theater.actions';
import { Theater } from 'src/app/core/models/theater';
import { Toast, ToastStatus } from 'src/app/core/models/toast';

export const theaterFeatureKey = 'theater';

export interface State {
  toast: Toast | null;
  isLoading: boolean;
  theater: Theater | null;
  savedTheaterId: number | null;
}

export const initialState: State = {
  toast: null,
  isLoading: false,
  theater: null,
  savedTheaterId: null,
};

export const reducer = createReducer(
  initialState,
  on(TheaterActions.loadTheater, (state) => {
    return {
      ...state,
      isLoading: true,
    }
  }),
  on(TheaterActions.loadTheaterSuccess, (state, { response }) => {
    return {
      ...state,
      isLoading: false,
      theater: response,
    }
  }),
  on(TheaterActions.loadTheaterFailure, (state) => {
    return {
      ...state,
      toast: {
        message: "Errore durante il recupero del cinema.",
        status: ToastStatus.ERROR,
      },
      isLoading: false,
    };
  }),
  on(TheaterActions.saveTheater, (state) => {
    return {
      ...state,
      isLoading: true,
    }
  }),
  on(TheaterActions.saveTheaterSuccess, (state, { response }) => {
    return {
      ...state,
      toast: {
        message: "Cinema aggiornato con successo.",
        status: ToastStatus.SUCCESS,
      },
      isLoading: false,
      savedTheaterId: response,
    }
  }),
  on(TheaterActions.saveTheaterFailure, (state) => {
    return {
      ...state,
      toast: {
        message: "Errore durante il salvataggio del cinema.",
        status: ToastStatus.ERROR,
      },
      isLoading: false,
    };
  }),
  on(TheaterActions.resetSavedTheaterId, (state) => {
    return {
      ...state,
      savedTheaterId: null,
    }
  }),
);

export const theaterFeature = createFeature({
  name: theaterFeatureKey,
  reducer,
});

