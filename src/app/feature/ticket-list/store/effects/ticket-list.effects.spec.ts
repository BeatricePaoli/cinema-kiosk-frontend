import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TicketListEffects } from './ticket-list.effects';

describe('TicketListEffects', () => {
  let actions$: Observable<any>;
  let effects: TicketListEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TicketListEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(TicketListEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
