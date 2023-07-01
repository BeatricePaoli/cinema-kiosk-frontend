import * as fromCashDesk from '../reducers/cash-desk.reducer';
import { selectCashDeskState } from './cash-desk.selectors';

describe('CashDesk Selectors', () => {
  it('should select the feature state', () => {
    const result = selectCashDeskState({
      [fromCashDesk.cashDeskFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
