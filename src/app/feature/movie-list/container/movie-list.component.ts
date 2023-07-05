import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map, of, startWith } from 'rxjs';
import { SlideInOutAnimation } from 'src/app/core/animations/slide-in-out.animation';
import { Movie, MovieFilter } from 'src/app/core/models/movie';
import { TheaterFilter } from 'src/app/core/models/theater';
import { Toast } from 'src/app/core/models/toast';
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
    movie: new FormControl(''),
    city: new FormControl(''),
    cinema: new FormControl('')
  });

  additionalFiltersTot: number = 0;

  theaterFilter: TheaterFilter | null = null;

  cities: string[] = [];
  filteredCities: Observable<string[]> = new Observable<string[]>;

  cinemas: string[] = [];
  filteredCinemas: Observable<string[]> = new Observable<string[]>;

  animationState = 'out';

  currentMovies$: Observable<Movie[]> = of([]);
  futureMovies$: Observable<Movie[]> = of([]);

  isLoading$: Observable<boolean> = of(false);
  toast$: Observable<Toast | null> = of(null);

  slideConfig = {
    slidesToShow: 5,
    swipeToSlide: true,
    lazyLoad: 'ondemand', // TODO: check se funziona (non sembra, generare thumbnail a backend) + implementare vero lazy load array
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

  private setupSearchFilters(filter: TheaterFilter) {
    this.theaterFilter = filter;
    this.cities = filter.cities.map(c => c.name);
    this.cinemas = [];
    filter.cities.forEach(city => this.cinemas = this.cinemas.concat(city.theaters));

    this.filteredCities = this.searchForm.get('city')!.valueChanges.pipe(
      startWith(''),
      map(value => this.autoCompletefilter(value || '', this.cities)),
    );

    this.filteredCinemas = this.searchForm.get('cinema')!.valueChanges.pipe(
      startWith(''),
      map(value => this.autoCompletefilter(value || '', this.cinemas)),
    );

    this.subs.push(this.searchForm.get('city')!.valueChanges.subscribe((value: string | null) => {
      const valid = this.theaterFilter?.cities.find(c => c.name === value);
      this.cinemas = valid ? valid.theaters : [];
      
      // Trigger di valueChanges per aggiornare filteredCinemas
      this.searchForm.patchValue({
        cinema: this.searchForm.get('cinema')?.value
      });
    }));

    this.subs.push(this.searchForm.valueChanges.subscribe(values => {
      const { city, cinema } = values; 
      this.additionalFiltersTot = (city && city !== '' ? 1 : 0) + (cinema && cinema !== '' ? 1 : 0);
    }))
  }

  private autoCompletefilter(value: string, list: string[]): string[] {
    const filterValue = value.toLowerCase();
    return list.filter(option => option.toLowerCase().includes(filterValue));
  }

  onToggleAccordion() {
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
  }

  onSubmit() {
    const values = this.searchForm.value;
    const filter: MovieFilter = {
      movie: values.movie ?? undefined,
      city: values.city ?? undefined,
      cinema: values.cinema ?? undefined,
    };
    this.store.dispatch(MovieListActions.loadMovieList({ filter }));
  }
}
