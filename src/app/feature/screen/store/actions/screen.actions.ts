import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ScreenActions = createActionGroup({
  source: 'Screen',
  events: {
    'Load Screens': emptyProps(),
    'Load Screens Success': props<{ data: unknown }>(),
    'Load Screens Failure': props<{ error: unknown }>(),
  }
});
