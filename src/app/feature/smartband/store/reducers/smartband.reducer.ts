import { createFeature, createReducer, on } from '@ngrx/store';
import { SmartbandActions } from '../actions/smartband.actions';
import { Device, DeviceActivity } from 'src/app/core/models/device';
import { Toast, ToastStatus } from 'src/app/core/models/toast';

export const smartbandFeatureKey = 'smartband';

export interface State {
  toast: Toast | null;
  isLoading: boolean;
  smartBand: Device | null;
  activities: DeviceActivity[];
}

export const initialState: State = {
  toast: null,
  isLoading: false,
  smartBand: null,
  activities: [],
};

export const reducer = createReducer(
  initialState,
  on(SmartbandActions.loadSmartBand, (state) => {
    return {
      ...state,
      isLoading: true,
    }
  }),
  on(SmartbandActions.loadSmartBandSuccess, (state, { response }) => {
    return {
      ...state,
      isLoading: false,
      smartBand: response,
    }
  }),
  on(SmartbandActions.loadSmartBandFailure, (state) => {
    return {
      ...state,
      toast: {
        message: "Errore durante il recupero del braccialetto.",
        status: ToastStatus.ERROR,
      },
      isLoading: false,
    };
  }),
  on(SmartbandActions.loadActivities, (state) => {
    return {
      ...state,
      // isLoading: true,
    }
  }),
  on(SmartbandActions.loadActivitiesSuccess, (state, { response }) => {
    return {
      ...state,
      isLoading: false,
      activities: response,
    }
  }),
  on(SmartbandActions.loadActivitiesFailure, (state) => {
    return {
      ...state,
      toast: {
        message: "Errore durante il recupero dei log.",
        status: ToastStatus.ERROR,
      },
      isLoading: false,
    };
  }),
);

export const smartbandFeature = createFeature({
  name: smartbandFeatureKey,
  reducer,
});

