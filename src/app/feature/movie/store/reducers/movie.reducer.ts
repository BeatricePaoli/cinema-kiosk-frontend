import { createFeature, createReducer, on } from '@ngrx/store';
import { MovieActions } from '../actions/movie.actions';
import { Movie } from 'src/app/core/models/movie';
import { Toast, ToastStatus } from 'src/app/core/models/toast';

export const movieFeatureKey = 'movie';

export interface State {
  toast: Toast | null;
  isLoading: boolean;
  movie: Movie | null;
}

export const initialState: State = {
  toast: null,
  isLoading: false,
  movie: null,
};

export const reducer = createReducer(
  initialState,
  on(MovieActions.loadMovie, (state) => {
    return {
      ...state,
      isLoading: true,
    }
  }),
  on(MovieActions.loadMovieSuccess, (state, { response }) => {
    return {
      ...state,
      isLoading: false,
      movie: response,
    }
  }),
  on(MovieActions.loadMovieFailure, (state) => {
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

export const movieFeature = createFeature({
  name: movieFeatureKey,
  reducer,
});

