import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _moment from 'moment';
import { Observable, Subscription, of, take } from 'rxjs';
import { Movie } from 'src/app/core/models/movie';
import { Toast } from 'src/app/core/models/toast';
import * as RouterSelectors from 'src/app/core/router/router.selectors';
import { MovieActions } from '../store/actions/movie.actions';
import * as MovieSelectors from '../store/selectors/movie.selectors';

const moment = _moment;

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {

  movie: Movie | null = null;

  isLoading$: Observable<boolean> = of(false);
  toast$: Observable<Toast | null> = of(null);

  slideConfig = {
    swipeToSlide: true,
    dots: false,
    infinite: false,
    variableWidth: true,
    prevArrow: '<img class="slick-left" src="assets/images/icons/chevron_left.svg">',
    nextArrow: '<img class="slick-right" src="assets/images/icons/chevron_right.svg">',
  };

  subs: Subscription[] = [];

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.select(RouterSelectors.selectParams).pipe(take(1)).subscribe(params => {
      if (params && params.movieId) {
        this.store.dispatch(MovieActions.loadMovie({ id: params.movieId }));
      } 
    });

    this.isLoading$ = this.store.select(MovieSelectors.selectIsLoading);
    this.toast$ = this.store.select(MovieSelectors.selectToast);

    this.subs.push(this.store.select(MovieSelectors.selectMovie).subscribe(movie => {
      this.movie = movie;
    }));
  }

  showBookingBtn() {
    return this.movie && moment(this.movie.releaseDate).isSameOrBefore(moment());
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}
