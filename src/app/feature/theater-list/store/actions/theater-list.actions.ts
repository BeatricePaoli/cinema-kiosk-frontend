import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const TheaterListActions = createActionGroup({
  source: 'TheaterList',
  events: {
    'Load TheaterLists': emptyProps(),
    'Load TheaterLists Success': props<{ data: unknown }>(),
    'Load TheaterLists Failure': props<{ error: unknown }>(),
  }
});
