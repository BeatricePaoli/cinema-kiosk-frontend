import * as fromTheaterList from '../reducers/theater-list.reducer';
import { selectTheaterListState } from './theater-list.selectors';

describe('TheaterList Selectors', () => {
  it('should select the feature state', () => {
    const result = selectTheaterListState({
      [fromTheaterList.theaterListFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
