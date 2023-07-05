import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMovie from '../reducers/movie.reducer';

export const selectMovieState = createFeatureSelector<fromMovie.State>(
  fromMovie.movieFeatureKey
);

export const selectMovie = createSelector(
  selectMovieState,
  (state: fromMovie.State) => {
    return state?.movie;
  }
);

export const selectToast = createSelector(
  selectMovieState,
  (state: fromMovie.State) => {
    return state?.toast;
  }
);

export const selectIsLoading = createSelector(
  selectMovieState,
  (state: fromMovie.State) => {
    return state?.isLoading;
  }
);