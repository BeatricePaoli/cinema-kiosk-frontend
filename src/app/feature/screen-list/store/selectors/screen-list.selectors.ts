import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromScreenList from '../reducers/screen-list.reducer';

export const selectScreenListState = createFeatureSelector<fromScreenList.State>(
  fromScreenList.screenListFeatureKey
);
