import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SmartbandEffects } from './smartband.effects';

describe('SmartbandEffects', () => {
  let actions$: Observable<any>;
  let effects: SmartbandEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SmartbandEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(SmartbandEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
