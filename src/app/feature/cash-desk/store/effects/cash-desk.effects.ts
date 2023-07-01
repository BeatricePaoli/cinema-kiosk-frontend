import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CashDeskActions } from '../actions/cash-desk.actions';


@Injectable()
export class CashDeskEffects {

  loadCashDesks$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CashDeskActions.loadCashDesks),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => CashDeskActions.loadCashDesksSuccess({ data })),
          catchError(error => of(CashDeskActions.loadCashDesksFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
