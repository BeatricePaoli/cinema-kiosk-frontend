import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTheater from '../reducers/theater.reducer';

export const selectTheaterState = createFeatureSelector<fromTheater.State>(
  fromTheater.theaterFeatureKey
);

export const selectTheater = createSelector(
  selectTheaterState,
  (state: fromTheater.State) => {
    return state?.theater;
  }
);

export const selectToast = createSelector(
  selectTheaterState,
  (state: fromTheater.State) => {
    return state?.toast;
  }
);

export const selectIsLoading = createSelector(
  selectTheaterState,
  (state: fromTheater.State) => {
    return state?.isLoading;
  }
);

export const selectSavedTheaterId = createSelector(
  selectTheaterState,
  (state: fromTheater.State) => {
    return state?.savedTheaterId;
  }
);