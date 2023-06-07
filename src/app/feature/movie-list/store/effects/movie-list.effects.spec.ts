import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MovieListEffects } from './movie-list.effects';

describe('MovieListEffects', () => {
  let actions$: Observable<any>;
  let effects: MovieListEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieListEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(MovieListEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
