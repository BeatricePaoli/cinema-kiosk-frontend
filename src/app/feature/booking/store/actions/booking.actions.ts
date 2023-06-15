import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const BookingActions = createActionGroup({
  source: 'Booking',
  events: {
    'Load Bookings': emptyProps(),
    'Load Bookings Success': props<{ data: unknown }>(),
    'Load Bookings Failure': props<{ error: unknown }>(),
  }
});
