import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const MovieListActions = createActionGroup({
  source: 'MovieList',
  events: {
    'Load MovieLists': emptyProps(),
    'Load MovieLists Success': props<{ data: unknown }>(),
    'Load MovieLists Failure': props<{ error: unknown }>(),
  }
});
