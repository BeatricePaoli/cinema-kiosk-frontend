import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { BarListEffects } from './bar-list.effects';

describe('BarListEffects', () => {
  let actions$: Observable<any>;
  let effects: BarListEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BarListEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(BarListEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
