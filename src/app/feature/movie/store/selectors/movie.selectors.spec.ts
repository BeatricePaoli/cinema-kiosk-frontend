import * as fromMovie from '../reducers/movie.reducer';
import { selectMovieState } from './movie.selectors';

describe('Movie Selectors', () => {
  it('should select the feature state', () => {
    const result = selectMovieState({
      [fromMovie.movieFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
