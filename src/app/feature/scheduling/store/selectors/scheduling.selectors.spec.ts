import * as fromScheduling from '../reducers/scheduling.reducer';
import { selectSchedulingState } from './scheduling.selectors';

describe('Scheduling Selectors', () => {
  it('should select the feature state', () => {
    const result = selectSchedulingState({
      [fromScheduling.schedulingFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
