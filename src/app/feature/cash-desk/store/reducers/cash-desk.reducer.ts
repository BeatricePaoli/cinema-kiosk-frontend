import { createFeature, createReducer, on } from '@ngrx/store';
import { CashDeskActions } from '../actions/cash-desk.actions';

export const cashDeskFeatureKey = 'cashDesk';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(CashDeskActions.loadCashDesks, state => state),
  on(CashDeskActions.loadCashDesksSuccess, (state, action) => state),
  on(CashDeskActions.loadCashDesksFailure, (state, action) => state),
);

export const cashDeskFeature = createFeature({
  name: cashDeskFeatureKey,
  reducer,
});

