import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Movie, MovieFilter } from 'src/app/core/models/movie';
import { Show } from 'src/app/core/models/show';
import { TheaterFilter } from 'src/app/core/models/theater';
import { TicketType } from 'src/app/core/models/tickets';

export const BookingFormActions = createActionGroup({
  source: 'BookingForm',
  events: {
    'Load Filter': props<{ movieId: number }>(),
    'Load Filter Success': props<{ response: TheaterFilter }>(),
    'Load Filter Failure': emptyProps(),

    'Load Movie': props<{ id: number }>(),
    'Load Movie Success': props<{ response: Movie }>(),
    'Load Movie Failure': emptyProps(),

    'Load ShowsList': props<{ filter: MovieFilter }>(),
    'Load ShowsList Success': props<{ response: Show[] }>(),
    'Load ShowsList Failure': emptyProps(),

    'Load TicketTypesList': props<{ id: number }>(),
    'Load TicketTypesList Success': props<{ response: TicketType[] }>(),
    'Load TicketTypesList Failure': emptyProps(),
  }
});
