import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Device, DeviceFilterDto } from 'src/app/core/models/device';
import { Theater } from 'src/app/core/models/theater';

export const DeviceListActions = createActionGroup({
  source: 'DeviceList',
  events: {
    'Load Theater': props<{ id: number }>(),
    'Load Theater Success': props<{ response: Theater }>(),
    'Load Theater Failure': emptyProps(),

    'Load SmartBands': props<{ filter: DeviceFilterDto }>(),
    'Load SmartBands Success': props<{ response: Device[] }>(),
    'Load SmartBands Failure': emptyProps(),

    'Load CashRegisters': props<{ filter: DeviceFilterDto }>(),
    'Load CashRegisters Success': props<{ response: Device[] }>(),
    'Load CashRegisters Failure': emptyProps(),

    'Deactivate SmartBand': props<{ id: number, filter: DeviceFilterDto }>(),
    'Deactivate SmartBand Success And Reload': props<{ filter: DeviceFilterDto }>(),
    'Deactivate SmartBand Success': emptyProps(),
    'Deactivate SmartBand Failure': emptyProps(),
  }
});
