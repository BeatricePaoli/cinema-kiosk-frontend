import * as fromTheater from '../reducers/theater.reducer';
import { selectTheaterState } from './theater.selectors';

describe('Theater Selectors', () => {
  it('should select the feature state', () => {
    const result = selectTheaterState({
      [fromTheater.theaterFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
