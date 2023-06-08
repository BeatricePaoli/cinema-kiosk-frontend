import { createFeature, createReducer, on } from '@ngrx/store';
import { MovieActions } from '../actions/movie.actions';

export const movieFeatureKey = 'movie';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(MovieActions.loadMovies, state => state),
  on(MovieActions.loadMoviesSuccess, (state, action) => state),
  on(MovieActions.loadMoviesFailure, (state, action) => state),
);

export const movieFeature = createFeature({
  name: movieFeatureKey,
  reducer,
});

