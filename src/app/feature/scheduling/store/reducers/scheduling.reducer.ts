import { createFeature, createReducer, on } from '@ngrx/store';
import { SchedulingActions } from '../actions/scheduling.actions';

export const schedulingFeatureKey = 'scheduling';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(SchedulingActions.loadSchedulings, state => state),
  on(SchedulingActions.loadSchedulingsSuccess, (state, action) => state),
  on(SchedulingActions.loadSchedulingsFailure, (state, action) => state),
);

export const schedulingFeature = createFeature({
  name: schedulingFeatureKey,
  reducer,
});

