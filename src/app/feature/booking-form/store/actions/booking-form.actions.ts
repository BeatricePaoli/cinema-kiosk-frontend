import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const BookingFormActions = createActionGroup({
  source: 'BookingForm',
  events: {
    'Load BookingForms': emptyProps(),
    'Load BookingForms Success': props<{ data: unknown }>(),
    'Load BookingForms Failure': props<{ error: unknown }>(),
  }
});
