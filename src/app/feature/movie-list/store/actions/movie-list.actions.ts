import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MovieFilter, MovieSearchResponse } from 'src/app/core/models/movie';
import { TheaterFilter } from 'src/app/core/models/theater';

export const MovieListActions = createActionGroup({
  source: 'MovieList',
  events: {
    'Load MovieList': props<{ filter: MovieFilter }>(),
    'Load MovieList Success': props<{ response: MovieSearchResponse }>(),
    'Load MovieList Failure': emptyProps(),
    // 'Set IsLoading': props<{ isLoading: boolean }>(),
    'Load Filter': emptyProps(),
    'Load Filter Success': props<{ response: TheaterFilter }>(),
    'Load Filter Failure': emptyProps(),
  }
});