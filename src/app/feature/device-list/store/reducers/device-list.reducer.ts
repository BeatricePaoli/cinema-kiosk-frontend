import { createFeature, createReducer, on } from '@ngrx/store';
import { DeviceListActions } from '../actions/device-list.actions';
import { Toast, ToastStatus } from 'src/app/core/models/toast';
import { Theater } from 'src/app/core/models/theater';
import { Device } from 'src/app/core/models/device';

export const deviceListFeatureKey = 'deviceList';

export interface State {
  toast: Toast | null;
  isLoading: boolean;
  theater: Theater | null;
  smartBands: Device[];
  cashRegisters: Device[];
}

export const initialState: State = {
  toast: null,
  isLoading: false,
  theater: null,
  smartBands: [],
  cashRegisters: [],
};

export const reducer = createReducer(
  initialState,
  on(DeviceListActions.loadTheater, (state) => {
    return {
      ...state,
      isLoading: true,
    }
  }),
  on(DeviceListActions.loadTheaterSuccess, (state, { response }) => {
    return {
      ...state,
      isLoading: false,
      theater: response,
    }
  }),
  on(DeviceListActions.loadTheaterFailure, (state) => {
    return {
      ...state,
      toast: {
        message: "Errore durante il recupero del cinema.",
        status: ToastStatus.ERROR,
      },
      isLoading: false,
    };
  }),
  on(DeviceListActions.loadSmartBands, (state) => {
    return {
      ...state,
      isLoading: true,
    }
  }),
  on(DeviceListActions.loadSmartBandsSuccess, (state, { response }) => {
    return {
      ...state,
      isLoading: false,
      smartBands: response,
    }
  }),
  on(DeviceListActions.loadSmartBandsFailure, (state) => {
    return {
      ...state,
      toast: {
        message: "Errore durante il recupero dei braccialetti.",
        status: ToastStatus.ERROR,
      },
      isLoading: false,
    };
  }),
  on(DeviceListActions.loadCashRegisters, (state) => {
    return {
      ...state,
      isLoading: true,
    }
  }),
  on(DeviceListActions.loadCashRegistersSuccess, (state, { response }) => {
    return {
      ...state,
      isLoading: false,
      cashRegisters: response,
    }
  }),
  on(DeviceListActions.loadCashRegistersFailure, (state) => {
    return {
      ...state,
      toast: {
        message: "Errore durante il recupero delle casse.",
        status: ToastStatus.ERROR,
      },
      isLoading: false,
    };
  }),
  on(DeviceListActions.deactivateSmartBand, (state) => {
    return {
      ...state,
      isLoading: true,
    }
  }),
  on(DeviceListActions.deactivateSmartBandSuccess, (state) => {
    return {
      ...state,
      toast: {
        message: "Dispositivo disattivato.",
        status: ToastStatus.SUCCESS,
      },
      isLoading: false,
    }
  }),
  on(DeviceListActions.deactivateSmartBandFailure, (state) => {
    return {
      ...state,
      toast: {
        message: "Errore durante la disattivazione del dispositivo.",
        status: ToastStatus.ERROR,
      },
      isLoading: false,
    };
  }),
);

export const deviceListFeature = createFeature({
  name: deviceListFeatureKey,
  reducer,
});

