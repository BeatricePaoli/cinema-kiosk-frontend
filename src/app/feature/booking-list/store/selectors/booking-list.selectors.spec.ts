import * as fromBookingList from '../reducers/booking-list.reducer';
import { selectBookingListState } from './booking-list.selectors';

describe('BookingList Selectors', () => {
  it('should select the feature state', () => {
    const result = selectBookingListState({
      [fromBookingList.bookingListFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
