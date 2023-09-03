import { createFeature, createReducer, on } from '@ngrx/store';
import { DeviceListActions } from '../actions/device-list.actions';

export const deviceListFeatureKey = 'deviceList';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(DeviceListActions.loadDeviceLists, state => state),
  on(DeviceListActions.loadDeviceListsSuccess, (state, action) => state),
  on(DeviceListActions.loadDeviceListsFailure, (state, action) => state),
);

export const deviceListFeature = createFeature({
  name: deviceListFeatureKey,
  reducer,
});

