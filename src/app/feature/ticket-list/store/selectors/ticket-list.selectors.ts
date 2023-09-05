import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTicketList from '../reducers/ticket-list.reducer';

export const selectTicketListState = createFeatureSelector<fromTicketList.State>(
  fromTicketList.ticketListFeatureKey
);
