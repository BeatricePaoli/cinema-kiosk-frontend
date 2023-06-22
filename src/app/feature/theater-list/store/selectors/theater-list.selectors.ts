import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTheaterList from '../reducers/theater-list.reducer';

export const selectTheaterListState = createFeatureSelector<fromTheaterList.State>(
  fromTheaterList.theaterListFeatureKey
);
