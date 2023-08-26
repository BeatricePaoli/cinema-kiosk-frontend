import * as fromBookingValidator from '../reducers/booking-validator.reducer';
import { selectBookingValidatorState } from './booking-validator.selectors';

describe('BookingValidator Selectors', () => {
  it('should select the feature state', () => {
    const result = selectBookingValidatorState({
      [fromBookingValidator.bookingValidatorFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
