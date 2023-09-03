import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const DeviceListActions = createActionGroup({
  source: 'DeviceList',
  events: {
    'Load DeviceLists': emptyProps(),
    'Load DeviceLists Success': props<{ data: unknown }>(),
    'Load DeviceLists Failure': props<{ error: unknown }>(),
  }
});
