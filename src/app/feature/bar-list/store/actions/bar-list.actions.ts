import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const BarListActions = createActionGroup({
  source: 'BarList',
  events: {
    'Load BarLists': emptyProps(),
    'Load BarLists Success': props<{ data: unknown }>(),
    'Load BarLists Failure': props<{ error: unknown }>(),
  }
});
