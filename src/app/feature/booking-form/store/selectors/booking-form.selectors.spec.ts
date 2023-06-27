import * as fromBookingForm from '../reducers/booking-form.reducer';
import { selectBookingFormState } from './booking-form.selectors';

describe('BookingForm Selectors', () => {
  it('should select the feature state', () => {
    const result = selectBookingFormState({
      [fromBookingForm.bookingFormFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
