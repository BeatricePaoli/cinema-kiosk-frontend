import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MovieFilter, MovieSearchResponse } from 'src/app/core/models/movie';
import { AutocompleteTheaterFilter } from 'src/app/core/models/theater';

export const MovieListActions = createActionGroup({
  source: 'MovieList',
  events: {
    'Load MovieList': props<{ filter: MovieFilter }>(),
    'Load MovieList Success': props<{ response: MovieSearchResponse }>(),
    'Load MovieList Failure': emptyProps(),
    'Load Filter': emptyProps(),
    'Load Filter Success': props<{ response: AutocompleteTheaterFilter }>(),
    'Load Filter Failure': emptyProps(),
  }
});