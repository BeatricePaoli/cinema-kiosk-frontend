import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TheaterEffects } from './theater.effects';

describe('TheaterEffects', () => {
  let actions$: Observable<any>;
  let effects: TheaterEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TheaterEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(TheaterEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
