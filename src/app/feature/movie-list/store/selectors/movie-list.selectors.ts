import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMovieList from '../reducers/movie-list.reducer';

export const selectMovieListState = createFeatureSelector<fromMovieList.State>(
  fromMovieList.movieListFeatureKey
);

export const selectCurrentMovies = createSelector(
  selectMovieListState,
  (state: fromMovieList.State) => {
    return state?.currentMovies;
  }
);

export const selectFutureMovies = createSelector(
  selectMovieListState,
  (state: fromMovieList.State) => {
    return state?.futureMovies;
  }
);

export const selectToast = createSelector(
  selectMovieListState,
  (state: fromMovieList.State) => {
    return state?.toast;
  }
);

export const selectIsLoading = createSelector(
  selectMovieListState,
  (state: fromMovieList.State) => {
    return state?.isLoading;
  }
);

export const selectTheaterFilter = createSelector(
  selectMovieListState,
  (state: fromMovieList.State) => {
    return state?.filter;
  }
);