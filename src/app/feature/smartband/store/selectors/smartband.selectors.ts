import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSmartband from '../reducers/smartband.reducer';

export const selectSmartbandState = createFeatureSelector<fromSmartband.State>(
  fromSmartband.smartbandFeatureKey
);

export const selectSmartband = createSelector(
  selectSmartbandState,
  (state: fromSmartband.State) => {
    return state?.smartBand;
  }
);

export const selectToast = createSelector(
  selectSmartbandState,
  (state: fromSmartband.State) => {
    return state?.toast;
  }
);

export const selectIsLoading = createSelector(
  selectSmartbandState,
  (state: fromSmartband.State) => {
    return state?.isLoading;
  }
);

export const selectActivities = createSelector(
  selectSmartbandState,
  (state: fromSmartband.State) => {
    return state?.activities;
  }
);