import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SchedulingEffects } from './scheduling.effects';

describe('SchedulingEffects', () => {
  let actions$: Observable<any>;
  let effects: SchedulingEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SchedulingEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(SchedulingEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
