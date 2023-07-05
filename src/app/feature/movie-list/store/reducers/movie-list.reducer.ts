import { createFeature, createReducer, on } from '@ngrx/store';
import { MovieListActions } from '../actions/movie-list.actions';
import { Toast, ToastStatus } from 'src/app/core/models/toast';
import { Movie } from 'src/app/core/models/movie';
import { TheaterFilter } from 'src/app/core/models/theater';

export const movieListFeatureKey = 'movieList';

export interface State {
  toast: Toast | null;
  isLoading: boolean;
  currentMovies: Movie[];
  futureMovies: Movie[];
  filter: TheaterFilter | null;
}

export const initialState: State = {
  toast: null,
  isLoading: false,
  currentMovies: [],
  futureMovies: [],
  filter: null,
};

export const reducer = createReducer(
  initialState,
  on(MovieListActions.loadMovieList, (state) => {
    return {
      ...state,
      isLoading: true,
    }
  }),
  on(MovieListActions.loadMovieListSuccess, (state, { response }) => {
    return {
      ...state,
      isLoading: false,
      currentMovies: response.current,
      futureMovies: response.future,
    }
  }),
  on(MovieListActions.loadMovieListFailure, (state) => {
    return {
      ...state,
      toast: {
        message: "Errore durante il recupero dei film.",
        status: ToastStatus.ERROR,
      },
      isLoading: false,
    };
  }),
  on(MovieListActions.loadFilter, (state) => {
    return {
      ...state,
    }
  }),
  on(MovieListActions.loadFilterSuccess, (state, { response }) => {
    return {
      ...state,
      filter: response,
    }
  }),
  on(MovieListActions.loadFilterFailure, (state) => {
    return {
      ...state,
      toast: {
        message: "Errore durante il recupero dei filtri.",
        status: ToastStatus.ERROR,
      },
    };
  }),
);

export const movieListFeature = createFeature({
  name: movieListFeatureKey,
  reducer,
});

