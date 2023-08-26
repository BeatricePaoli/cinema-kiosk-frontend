import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { BookingValidatorEffects } from './booking-validator.effects';

describe('BookingValidatorEffects', () => {
  let actions$: Observable<any>;
  let effects: BookingValidatorEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookingValidatorEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(BookingValidatorEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
