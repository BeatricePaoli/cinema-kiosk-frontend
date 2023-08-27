import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Booking } from 'src/app/core/models/booking';

export const BookingValidatorActions = createActionGroup({
  source: 'BookingValidator',
  events: {
    'Load Booking': props<{ id: number }>(),
    'Load Booking Success': props<{ response: Booking }>(),
    'Load Booking Failure': emptyProps(),

    'Validate Booking': props<{ id: number }>(),
    'Validate Booking Success And Reload': props<{ id: number }>(),
    'Validate Booking Success': emptyProps(),
    'Validate Booking Failure': emptyProps(),

    'Reset Booking': emptyProps(),
  }
});
