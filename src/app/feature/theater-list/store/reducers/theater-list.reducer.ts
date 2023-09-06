import { createFeature, createReducer, on } from '@ngrx/store';
import { TheaterListActions } from '../actions/theater-list.actions';
import { Theater } from 'src/app/core/models/theater';
import { Toast, ToastStatus } from 'src/app/core/models/toast';

export const theaterListFeatureKey = 'theaterList';

export interface State {
  toast: Toast | null;
  isLoading: boolean;
  theaters: Theater[],
}

export const initialState: State = {
  toast: null,
  isLoading: false,
  theaters: [],
};

export const reducer = createReducer(
  initialState,
  on(TheaterListActions.loadTheaterList, (state) => {
    return {
      ...state,
      isLoading: true,
    }
  }),
  on(TheaterListActions.loadTheaterListSuccess, (state, { response }) => {
    return {
      ...state,
      isLoading: false,
      theaters: response,
    }
  }),
  on(TheaterListActions.loadTheaterListFailure, (state) => {
    return {
      ...state,
      toast: {
        message: "Errore durante il recupero delle prenotazioni.",
        status: ToastStatus.ERROR,
      },
      isLoading: false,
    };
  }),
  on(TheaterListActions.deleteTheater, (state) => {
    return {
      ...state,
      isLoading: true,
    }
  }),
  on(TheaterListActions.deleteTheaterSuccess, (state) => {
    return {
      ...state,
      toast: {
        message: "Cinema cancellato.",
        status: ToastStatus.SUCCESS,
      },
      isLoading: false,
    }
  }),
  on(TheaterListActions.deleteTheaterFailure, (state) => {
    return {
      ...state,
      toast: {
        message: "Errore durante il recupero dei cinema.",
        status: ToastStatus.ERROR,
      },
      isLoading: false,
    };
  }),
);

export const theaterListFeature = createFeature({
  name: theaterListFeatureKey,
  reducer,
});

