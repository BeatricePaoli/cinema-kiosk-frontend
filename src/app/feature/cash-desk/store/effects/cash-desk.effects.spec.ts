import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CashDeskEffects } from './cash-desk.effects';

describe('CashDeskEffects', () => {
  let actions$: Observable<any>;
  let effects: CashDeskEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CashDeskEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CashDeskEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
