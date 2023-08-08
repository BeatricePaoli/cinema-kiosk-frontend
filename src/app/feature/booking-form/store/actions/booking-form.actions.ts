import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Movie } from 'src/app/core/models/movie';
import { TheaterFilter } from 'src/app/core/models/theater';

export const BookingFormActions = createActionGroup({
  source: 'BookingForm',
  events: {
    'Load Filter': props<{ movieId: number }>(),
    'Load Filter Success': props<{ response: TheaterFilter }>(),
    'Load Filter Failure': emptyProps(),

    'Load Movie': props<{ id: number }>(),
    'Load Movie Success': props<{ response: Movie }>(),
    'Load Movie Failure': emptyProps(),
  }
});
