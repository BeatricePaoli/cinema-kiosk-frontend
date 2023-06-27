import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { BookingFormEffects } from './booking-form.effects';

describe('BookingFormEffects', () => {
  let actions$: Observable<any>;
  let effects: BookingFormEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookingFormEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(BookingFormEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
