import { createFeature, createReducer, on } from '@ngrx/store';
import { BarListActions } from '../actions/bar-list.actions';

export const barListFeatureKey = 'barList';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(BarListActions.loadBarLists, state => state),
  on(BarListActions.loadBarListsSuccess, (state, action) => state),
  on(BarListActions.loadBarListsFailure, (state, action) => state),
);

export const barListFeature = createFeature({
  name: barListFeatureKey,
  reducer,
});

