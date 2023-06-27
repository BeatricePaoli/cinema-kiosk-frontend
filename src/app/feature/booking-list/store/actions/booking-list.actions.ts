import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const BookingListActions = createActionGroup({
  source: 'BookingList',
  events: {
    'Load BookingLists': emptyProps(),
    'Load BookingLists Success': props<{ data: unknown }>(),
    'Load BookingLists Failure': props<{ error: unknown }>(),
  }
});
