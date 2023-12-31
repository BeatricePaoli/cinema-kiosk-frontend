import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MovieService } from 'src/app/core/services/movie/movie.service';
import { TheaterService } from 'src/app/core/services/theater/theater.service';
import { BookingFormActions } from '../actions/booking-form.actions';
import { ShowService } from 'src/app/core/services/show/show.service';
import { BookingService } from 'src/app/core/services/booking/booking.service';


@Injectable()
export class BookingFormEffects {

  loadFilter$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(BookingFormActions.loadFilter),
      switchMap((action) => this.theaterService.getFilters(action.movieId)
        .pipe(
          map(data => BookingFormActions.loadFilterSuccess({ response: data })),
          catchError(error => of(BookingFormActions.loadFilterFailure())))
      )
    );
  });

  loadMovies$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(BookingFormActions.loadMovie),
      switchMap((action) => this.movieService.getMovie(action.id)
        .pipe(
          map(data => BookingFormActions.loadMovieSuccess({ response: data })),
          catchError(error => of(BookingFormActions.loadMovieFailure())))
      )
    );
  });

  loadShowsLists$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(BookingFormActions.loadShowsList),
      switchMap((action) => this.showService.searchShows(action.filter)
        .pipe(
          map(data => BookingFormActions.loadShowsListSuccess({ response: data })),
          catchError(error => of(BookingFormActions.loadShowsListFailure())))
      )
    );
  });

  loadTicketTypesLists$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(BookingFormActions.loadTicketTypesList),
      switchMap((action) => this.theaterService.getTicketTypes(action.id)
        .pipe(
          map(data => BookingFormActions.loadTicketTypesListSuccess({ response: data })),
          catchError(error => of(BookingFormActions.loadTicketTypesListFailure())))
      )
    );
  });

  saveBooking$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(BookingFormActions.saveBooking),
      switchMap((action) => this.bookingService.createBooking(action.booking)
        .pipe(
          map(data => BookingFormActions.saveBookingSuccess({ response: data })),
          catchError(error => of(BookingFormActions.saveBookingFailure())))
      )
    );
  });


  constructor(private actions$: Actions, 
    private movieService: MovieService,
    private theaterService: TheaterService,
    private showService: ShowService,
    private bookingService: BookingService) {}
}
