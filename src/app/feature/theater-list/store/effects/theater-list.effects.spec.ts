import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TheaterListEffects } from './theater-list.effects';

describe('TheaterListEffects', () => {
  let actions$: Observable<any>;
  let effects: TheaterListEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TheaterListEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(TheaterListEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
