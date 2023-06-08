import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { MovieEffects } from './movie.effects';

describe('MovieEffects', () => {
  let actions$: Observable<any>;
  let effects: MovieEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(MovieEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
