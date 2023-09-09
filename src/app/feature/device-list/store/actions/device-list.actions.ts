import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Device } from 'src/app/core/models/device';
import { Theater } from 'src/app/core/models/theater';

export const DeviceListActions = createActionGroup({
  source: 'DeviceList',
  events: {
    'Load Theater': props<{ id: number }>(),
    'Load Theater Success': props<{ response: Theater }>(),
    'Load Theater Failure': emptyProps(),

    'Load SmartBands': props<{ theaterId: number }>(),
    'Load SmartBands Success': props<{ response: Device[] }>(),
    'Load SmartBands Failure': emptyProps(),

    'Load CashRegisters': props<{ theaterId: number }>(),
    'Load CashRegisters Success': props<{ response: Device[] }>(),
    'Load CashRegisters Failure': emptyProps(),

    'Deactivate SmartBand': props<{ id: number, theaterId: number }>(),
    'Deactivate SmartBand Success And Reload': props<{ theaterId: number }>(),
    'Deactivate SmartBand Success': emptyProps(),
    'Deactivate SmartBand Failure': emptyProps(),
  }
});
