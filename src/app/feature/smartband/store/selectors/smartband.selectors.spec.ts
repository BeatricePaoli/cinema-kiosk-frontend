import * as fromSmartband from '../reducers/smartband.reducer';
import { selectSmartbandState } from './smartband.selectors';

describe('Smartband Selectors', () => {
  it('should select the feature state', () => {
    const result = selectSmartbandState({
      [fromSmartband.smartbandFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
