import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const TicketListActions = createActionGroup({
  source: 'TicketList',
  events: {
    'Load TicketLists': emptyProps(),
    'Load TicketLists Success': props<{ data: unknown }>(),
    'Load TicketLists Failure': props<{ error: unknown }>(),
  }
});
