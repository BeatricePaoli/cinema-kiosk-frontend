import * as fromScreenList from '../reducers/screen-list.reducer';
import { selectScreenListState } from './screen-list.selectors';

describe('ScreenList Selectors', () => {
  it('should select the feature state', () => {
    const result = selectScreenListState({
      [fromScreenList.screenListFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
