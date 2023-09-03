import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromDeviceList from '../reducers/device-list.reducer';

export const selectDeviceListState = createFeatureSelector<fromDeviceList.State>(
  fromDeviceList.deviceListFeatureKey
);
