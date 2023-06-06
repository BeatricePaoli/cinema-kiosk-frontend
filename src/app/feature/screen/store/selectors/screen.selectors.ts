import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromScreen from '../reducers/screen.reducer';

export const selectScreenState = createFeatureSelector<fromScreen.State>(
  fromScreen.screenFeatureKey
);
