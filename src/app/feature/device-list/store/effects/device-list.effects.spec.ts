import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DeviceListEffects } from './device-list.effects';

describe('DeviceListEffects', () => {
  let actions$: Observable<any>;
  let effects: DeviceListEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeviceListEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(DeviceListEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
