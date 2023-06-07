import { createFeature, createReducer, on } from '@ngrx/store';
import { MovieListActions } from '../actions/movie-list.actions';

export const movieListFeatureKey = 'movieList';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(MovieListActions.loadMovieLists, state => state),
  on(MovieListActions.loadMovieListsSuccess, (state, action) => state),
  on(MovieListActions.loadMovieListsFailure, (state, action) => state),
);

export const movieListFeature = createFeature({
  name: movieListFeatureKey,
  reducer,
});

