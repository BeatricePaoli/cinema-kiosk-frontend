import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const BookingValidatorActions = createActionGroup({
  source: 'BookingValidator',
  events: {
    'Load BookingValidators': emptyProps(),
    'Load BookingValidators Success': props<{ data: unknown }>(),
    'Load BookingValidators Failure': props<{ error: unknown }>(),
  }
});
