import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Device, DeviceActivity } from 'src/app/core/models/device';

export const SmartbandActions = createActionGroup({
  source: 'SmartBand',
  events: {
    'Load SmartBand': props<{ id: number, theaterId: number }>(),
    'Load SmartBand Success': props<{ response: Device }>(),
    'Load SmartBand Failure': emptyProps(),

    'Load Activities': props<{ id: number, theaterId: number }>(),
    'Load Activities Success': props<{ response: DeviceActivity[] }>(),
    'Load Activities Failure': emptyProps(),
  }
});
