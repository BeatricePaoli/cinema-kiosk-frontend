import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const SchedulingActions = createActionGroup({
  source: 'Scheduling',
  events: {
    'Load Schedulings': emptyProps(),
    'Load Schedulings Success': props<{ data: unknown }>(),
    'Load Schedulings Failure': props<{ error: unknown }>(),
  }
});
