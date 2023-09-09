import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDeviceList from '../reducers/device-list.reducer';

export const selectDeviceListState = createFeatureSelector<fromDeviceList.State>(
  fromDeviceList.deviceListFeatureKey
);

export const selectTheater = createSelector(
  selectDeviceListState,
  (state: fromDeviceList.State) => {
    return state?.theater;
  }
);

export const selectToast = createSelector(
  selectDeviceListState,
  (state: fromDeviceList.State) => {
    return state?.toast;
  }
);

export const selectIsLoading = createSelector(
  selectDeviceListState,
  (state: fromDeviceList.State) => {
    return state?.isLoading;
  }
);

export const selectSmartBands = createSelector(
  selectDeviceListState,
  (state: fromDeviceList.State) => {
    return state?.smartBands;
  }
);

export const selectCashRegisters = createSelector(
  selectDeviceListState,
  (state: fromDeviceList.State) => {
    return state?.cashRegisters;
  }
);