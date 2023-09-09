import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TheaterService } from 'src/app/core/services/theater/theater.service';
import { TheaterActions } from '../actions/theater.actions';


@Injectable()
export class TheaterEffects {

  loadTheater$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(TheaterActions.loadTheater),
      switchMap((action) => this.theaterService.getTheater(action.id)
        .pipe(
          map(data => TheaterActions.loadTheaterSuccess({ response: data })),
          catchError(error => of(TheaterActions.loadTheaterFailure())))
      )
    );
  });

  saveTheater$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(TheaterActions.saveTheater),
      switchMap((action) => this.theaterService.saveTheater(action.theater)
        .pipe(
          map(data => TheaterActions.saveTheaterSuccess({ response: data })),
          catchError(error => of(TheaterActions.saveTheaterFailure())))
      )
    );
  });


  constructor(private actions$: Actions, private theaterService: TheaterService) {}
}
