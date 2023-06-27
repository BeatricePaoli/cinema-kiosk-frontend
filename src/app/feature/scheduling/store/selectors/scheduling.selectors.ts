import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromScheduling from '../reducers/scheduling.reducer';

export const selectSchedulingState = createFeatureSelector<fromScheduling.State>(
  fromScheduling.schedulingFeatureKey
);
