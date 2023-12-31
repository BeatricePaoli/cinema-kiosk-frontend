import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription, of } from 'rxjs';
import { SlideInOutAnimation } from 'src/app/core/animations/slide-in-out.animation';
import { Movie, MovieFilter } from 'src/app/core/models/movie';
import { AutocompleteTheaterFilter, TheaterFilter } from 'src/app/core/models/theater';
import { Toast } from 'src/app/core/models/toast';
import { setupSearchFilters } from 'src/app/core/utils/autocomplete-utils';
import { MovieListActions } from '../store/actions/movie-list.actions';
import * as MovieListSelectors from '../store/selectors/movie-list.selectors';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  animations: [SlideInOutAnimation]
})
export class MovieListComponent implements OnInit, OnDestroy {

  searchForm = new FormGroup({
    movie: new FormControl<string | null>(null),
    city: new FormControl<string | null>(null),
    theater: new FormControl<TheaterFilter | null>(null),
  });

  additionalFiltersTot: number = 0;

  theaterFilter: AutocompleteTheaterFilter | null = null;

  cities: string[] = [];
  filteredCities: Observable<string[]> = new Observable<string[]>;

  theaters: TheaterFilter[] = [];
  filteredTheaters: Observable<TheaterFilter[]> = new Observable<TheaterFilter[]>;

  animationState = 'out';

  currentMovies$:  Observable<Movie[]> = of([]);
  futureMovies$:  Observable<Movie[]> = of([]);

  isLoading$: Observable<boolean> = of(false);
  toast$: Observable<Toast | null> = of(null);

  slideConfig = {
    slidesToShow: 5,
    swipeToSlide: true,
    dots: false,
    infinite: false,
    prevArrow: '<img class="slick-left" src="assets/images/icons/chevron_left.svg">',
    nextArrow: '<img class="slick-right" src="assets/images/icons/chevron_right.svg">',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
    ]
  };

  subs: Subscription[] = [];

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(MovieListActions.loadMovieList({ filter: {} }));
    this.store.dispatch(MovieListActions.loadFilter());

    this.currentMovies$ = this.store.select(MovieListSelectors.selectCurrentMovies);
    this.futureMovies$ = this.store.select(MovieListSelectors.selectFutureMovies);

    this.isLoading$ = this.store.select(MovieListSelectors.selectIsLoading);
    this.toast$ = this.store.select(MovieListSelectors.selectToast);

    this.subs.push(this.store.select(MovieListSelectors.selectTheaterFilter).subscribe(filter => {
      if (filter) {
        this.setupSearchFilters(filter);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  private setupSearchFilters(filter: AutocompleteTheaterFilter) {
    this.theaterFilter = filter;

    const { cities, theaters, filteredCities, filteredTheaters } = setupSearchFilters(filter, this.searchForm, this.subs);
    this.cities = cities;
    this.theaters = theaters;
    this.filteredCities = filteredCities;
    this.filteredTheaters = filteredTheaters;

    this.subs.push(this.searchForm.valueChanges.subscribe(values => {
      const { city, theater } = values; 
      this.additionalFiltersTot = (city && city !== '' ? 1 : 0) + (theater && theater.id ? 1 : 0);
    }));
  }

  displayFnTheater(theater: TheaterFilter): string {
    return theater && theater.name ? theater.name : '';
  }

  onToggleAccordion() {
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
  }

  onSubmit() {
    const values = this.searchForm.value;
    const filter: MovieFilter = {
      movie: values.movie ?? undefined,
      city: values.city ?? undefined,
      theaterId: values.theater && values.theater.id ? values.theater.id : undefined,
    };
    this.store.dispatch(MovieListActions.loadMovieList({ filter }));
  }
}
