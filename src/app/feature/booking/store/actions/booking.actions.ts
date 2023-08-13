import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Booking } from 'src/app/core/models/booking';

export const BookingActions = createActionGroup({
  source: 'Booking',
  events: {
    'Load Booking': props<{ id: number }>(),
    'Load Booking Success': props<{ response: Booking }>(),
    'Load Booking Failure': emptyProps(),
  }
});
