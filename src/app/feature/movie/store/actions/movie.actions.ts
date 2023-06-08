import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const MovieActions = createActionGroup({
  source: 'Movie',
  events: {
    'Load Movies': emptyProps(),
    'Load Movies Success': props<{ data: unknown }>(),
    'Load Movies Failure': props<{ error: unknown }>(),
  }
});
