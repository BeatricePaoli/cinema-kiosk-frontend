import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTheaterList from '../reducers/theater-list.reducer';

export const selectTheaterListState = createFeatureSelector<fromTheaterList.State>(
  fromTheaterList.theaterListFeatureKey
);

export const selectToast = createSelector(
  selectTheaterListState,
  (state: fromTheaterList.State) => {
    return state?.toast;
  }
);

export const selectIsLoading = createSelector(
  selectTheaterListState,
  (state: fromTheaterList.State) => {
    return state?.isLoading;
  }
);

export const selectTheaters = createSelector(
  selectTheaterListState,
  (state: fromTheaterList.State) => {
    return state?.theaters;
  }
);