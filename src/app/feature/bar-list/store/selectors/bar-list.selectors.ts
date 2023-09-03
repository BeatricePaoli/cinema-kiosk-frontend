import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBarList from '../reducers/bar-list.reducer';

export const selectBarListState = createFeatureSelector<fromBarList.State>(
  fromBarList.barListFeatureKey
);
