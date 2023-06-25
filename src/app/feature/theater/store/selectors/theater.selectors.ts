import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTheater from '../reducers/theater.reducer';

export const selectTheaterState = createFeatureSelector<fromTheater.State>(
  fromTheater.theaterFeatureKey
);
