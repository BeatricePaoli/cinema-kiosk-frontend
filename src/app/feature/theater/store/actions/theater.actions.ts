import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const TheaterActions = createActionGroup({
  source: 'Theater',
  events: {
    'Load Theaters': emptyProps(),
    'Load Theaters Success': props<{ data: unknown }>(),
    'Load Theaters Failure': props<{ error: unknown }>(),
  }
});
