import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMovie from '../reducers/movie.reducer';

export const selectMovieState = createFeatureSelector<fromMovie.State>(
  fromMovie.movieFeatureKey
);
