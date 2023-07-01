import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CashDeskActions = createActionGroup({
  source: 'CashDesk',
  events: {
    'Load CashDesks': emptyProps(),
    'Load CashDesks Success': props<{ data: unknown }>(),
    'Load CashDesks Failure': props<{ error: unknown }>(),
  }
});
