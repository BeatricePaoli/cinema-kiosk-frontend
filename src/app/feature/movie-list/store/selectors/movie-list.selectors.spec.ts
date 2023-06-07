import * as fromMovieList from '../reducers/movie-list.reducer';
import { selectMovieListState } from './movie-list.selectors';

describe('MovieList Selectors', () => {
  it('should select the feature state', () => {
    const result = selectMovieListState({
      [fromMovieList.movieListFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
