import { createFeature, createReducer, on } from '@ngrx/store';
import { TheaterListActions } from '../actions/theater-list.actions';

export const theaterListFeatureKey = 'theaterList';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(TheaterListActions.loadTheaterLists, state => state),
  on(TheaterListActions.loadTheaterListsSuccess, (state, action) => state),
  on(TheaterListActions.loadTheaterListsFailure, (state, action) => state),
);

export const theaterListFeature = createFeature({
  name: theaterListFeatureKey,
  reducer,
});

