import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TheaterService } from 'src/app/core/services/theater/theater.service';
import { TheaterListActions } from '../actions/theater-list.actions';


@Injectable()
export class TheaterListEffects {

  loadTheaterList$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(TheaterListActions.loadTheaterList),
      switchMap((action) => this.theaterService.getTheaters()
        .pipe(
          map(data => TheaterListActions.loadTheaterListSuccess({ response: data })),
          catchError(error => of(TheaterListActions.loadTheaterListFailure())))
      )
    );
  });

  deleteTheater$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(TheaterListActions.deleteTheater),
      switchMap((action) => this.theaterService.deleteTheater(action.id)
        .pipe(
          map(data => TheaterListActions.deleteTheaterSuccessAndReload()),
          catchError(error => of(TheaterListActions.deleteTheaterFailure())))
      )
    );
  });

  setSuccessToastOnDelete$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(TheaterListActions.deleteTheaterSuccessAndReload),
      map(action => TheaterListActions.deleteTheaterSuccess()),
    );
  });
  reloadTheatersOnDelete$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(TheaterListActions.deleteTheaterSuccessAndReload),
      map(action => TheaterListActions.loadTheaterList()),
    );
  });


  constructor(private actions$: Actions, private theaterService: TheaterService) {}
}
