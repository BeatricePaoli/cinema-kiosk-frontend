import { createFeature, createReducer, on } from '@ngrx/store';
import { TicketListActions } from '../actions/ticket-list.actions';

export const ticketListFeatureKey = 'ticketList';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(TicketListActions.loadTicketLists, state => state),
  on(TicketListActions.loadTicketListsSuccess, (state, action) => state),
  on(TicketListActions.loadTicketListsFailure, (state, action) => state),
);

export const ticketListFeature = createFeature({
  name: ticketListFeatureKey,
  reducer,
});

