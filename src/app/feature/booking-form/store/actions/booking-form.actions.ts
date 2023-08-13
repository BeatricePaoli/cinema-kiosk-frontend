import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Booking } from 'src/app/core/models/booking';
import { Movie, MovieFilter } from 'src/app/core/models/movie';
import { Show, ShowFilter } from 'src/app/core/models/show';
import { AutocompleteTheaterFilter } from 'src/app/core/models/theater';
import { TicketType } from 'src/app/core/models/tickets';

export const BookingFormActions = createActionGroup({
  source: 'BookingForm',
  events: {
    'Load Filter': props<{ movieId: number }>(),
    'Load Filter Success': props<{ response: AutocompleteTheaterFilter }>(),
    'Load Filter Failure': emptyProps(),

    'Load Movie': props<{ id: number }>(),
    'Load Movie Success': props<{ response: Movie }>(),
    'Load Movie Failure': emptyProps(),

    'Load ShowsList': props<{ filter: ShowFilter }>(),
    'Load ShowsList Success': props<{ response: Show[] }>(),
    'Load ShowsList Failure': emptyProps(),

    'Load TicketTypesList': props<{ id: number }>(),
    'Load TicketTypesList Success': props<{ response: TicketType[] }>(),
    'Load TicketTypesList Failure': emptyProps(),

    'Save Booking': props<{ booking: Booking }>(),
    'Save Booking Success': props<{ response: number }>(),
    'Save Booking Failure': emptyProps(),
  }
});
