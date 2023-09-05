import { createFeature, createReducer, on } from '@ngrx/store';
import { ScreenListActions } from '../actions/screen-list.actions';

export const screenListFeatureKey = 'screenList';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(ScreenListActions.loadScreenLists, state => state),
  on(ScreenListActions.loadScreenListsSuccess, (state, action) => state),
  on(ScreenListActions.loadScreenListsFailure, (state, action) => state),
);

export const screenListFeature = createFeature({
  name: screenListFeatureKey,
  reducer,
});

