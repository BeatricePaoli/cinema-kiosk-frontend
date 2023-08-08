import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MovieService } from 'src/app/core/services/movie/movie.service';
import { MovieActions } from '../actions/movie.actions';


@Injectable()
export class MovieEffects {

  loadMovie$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(MovieActions.loadMovie),
      switchMap((action) => this.movieService.getMovie(action.id)
        .pipe(
          map(data => MovieActions.loadMovieSuccess({ response: data })),
          catchError(error => of(MovieActions.loadMovieFailure())))
      )
    );
  });


  constructor(private actions$: Actions,
    private movieService: MovieService) {}
}
