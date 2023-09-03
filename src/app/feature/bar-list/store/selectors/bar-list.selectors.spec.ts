import * as fromBarList from '../reducers/bar-list.reducer';
import { selectBarListState } from './bar-list.selectors';

describe('BarList Selectors', () => {
  it('should select the feature state', () => {
    const result = selectBarListState({
      [fromBarList.barListFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
