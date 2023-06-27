import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { BookingListEffects } from './booking-list.effects';

describe('BookingListEffects', () => {
  let actions$: Observable<any>;
  let effects: BookingListEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookingListEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(BookingListEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
