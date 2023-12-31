import * as fromScreen from '../reducers/screen.reducer';
import { selectScreenState } from './screen.selectors';

describe('Screen Selectors', () => {
  it('should select the feature state', () => {
    const result = selectScreenState({
      [fromScreen.screenFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
