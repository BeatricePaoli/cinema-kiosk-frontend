import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMovieList from '../reducers/movie-list.reducer';

export const selectMovieListState = createFeatureSelector<fromMovieList.State>(
  fromMovieList.movieListFeatureKey
);
