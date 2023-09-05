import * as fromTicketList from '../reducers/ticket-list.reducer';
import { selectTicketListState } from './ticket-list.selectors';

describe('TicketList Selectors', () => {
  it('should select the feature state', () => {
    const result = selectTicketListState({
      [fromTicketList.ticketListFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
