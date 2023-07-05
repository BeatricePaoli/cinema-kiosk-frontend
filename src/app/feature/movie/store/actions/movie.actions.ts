import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Movie } from 'src/app/core/models/movie';

export const MovieActions = createActionGroup({
  source: 'Movie',
  events: {
    'Load Movie': props<{ id: number }>(),
    'Load Movie Success': props<{ response: Movie }>(),
    'Load Movie Failure': emptyProps(),
  }
});
