import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { TicketListActions } from '../actions/ticket-list.actions';


@Injectable()
export class TicketListEffects {

  loadTicketLists$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(TicketListActions.loadTicketLists),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => TicketListActions.loadTicketListsSuccess({ data })),
          catchError(error => of(TicketListActions.loadTicketListsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
