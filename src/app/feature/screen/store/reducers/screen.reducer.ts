import { createFeature, createReducer, on } from '@ngrx/store';
import { ScreenActions } from '../actions/screen.actions';

export const screenFeatureKey = 'screen';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(ScreenActions.loadScreens, state => state),
  on(ScreenActions.loadScreensSuccess, (state, action) => state),
  on(ScreenActions.loadScreensFailure, (state, action) => state),
);

export const screenFeature = createFeature({
  name: screenFeatureKey,
  reducer,
});

