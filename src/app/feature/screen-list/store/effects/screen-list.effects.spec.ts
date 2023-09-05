import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ScreenListEffects } from './screen-list.effects';

describe('ScreenListEffects', () => {
  let actions$: Observable<any>;
  let effects: ScreenListEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScreenListEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ScreenListEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
