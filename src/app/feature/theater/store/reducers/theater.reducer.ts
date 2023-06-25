import { createFeature, createReducer, on } from '@ngrx/store';
import { TheaterActions } from '../actions/theater.actions';

export const theaterFeatureKey = 'theater';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(TheaterActions.loadTheaters, state => state),
  on(TheaterActions.loadTheatersSuccess, (state, action) => state),
  on(TheaterActions.loadTheatersFailure, (state, action) => state),
);

export const theaterFeature = createFeature({
  name: theaterFeatureKey,
  reducer,
});

