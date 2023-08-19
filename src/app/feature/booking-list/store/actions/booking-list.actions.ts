import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Booking } from 'src/app/core/models/booking';

export const BookingListActions = createActionGroup({
  source: 'BookingList',
  events: {
    'Load BookingLists': emptyProps(),
    'Load BookingLists Success': props<{ response: Booking[] }>(),
    'Load BookingLists Failure': emptyProps(),

    'Delete Booking': props<{ id: number }>(),
    'Delete Booking Success And Reload': emptyProps(),
    'Delete Booking Success': emptyProps(),
    'Delete Booking Failure': emptyProps(),
  }
});
