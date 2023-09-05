import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ScreenListActions = createActionGroup({
  source: 'ScreenList',
  events: {
    'Load ScreenLists': emptyProps(),
    'Load ScreenLists Success': props<{ data: unknown }>(),
    'Load ScreenLists Failure': props<{ error: unknown }>(),
  }
});
