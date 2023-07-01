import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCashDesk from '../reducers/cash-desk.reducer';

export const selectCashDeskState = createFeatureSelector<fromCashDesk.State>(
  fromCashDesk.cashDeskFeatureKey
);
