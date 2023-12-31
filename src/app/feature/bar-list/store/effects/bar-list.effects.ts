import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { BarListActions } from '../actions/bar-list.actions';


@Injectable()
export class BarListEffects {

  loadBarLists$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(BarListActions.loadBarLists),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => BarListActions.loadBarListsSuccess({ data })),
          catchError(error => of(BarListActions.loadBarListsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
