import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Booking } from 'src/app/core/models/booking';

export const BookingListActions = createActionGroup({
  source: 'BookingList',
  events: {
    'Load BookingLists': emptyProps(),
    'Load BookingLists Success': props<{ response: Booking[] }>(),
    'Load BookingLists Failure': emptyProps(),
  }
});
