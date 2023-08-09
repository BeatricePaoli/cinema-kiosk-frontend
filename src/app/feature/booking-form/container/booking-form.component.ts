import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation, StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _moment from 'moment';
import { Observable, Subscription, map, of, startWith, take } from 'rxjs';
import { Movie, MovieFilter } from 'src/app/core/models/movie';
import { TheaterFilter } from 'src/app/core/models/theater';
import { Toast } from 'src/app/core/models/toast';
import * as RouterSelectors from 'src/app/core/router/router.selectors';
import { AutocompleteValidator } from 'src/app/core/validators/autocomplete.validator';
import { BookingFormActions } from '../store/actions/booking-form.actions';
import * as BookingFormSelectors from '../store/selectors/booking-form.selectors';
import { Show } from 'src/app/core/models/show';

const moment = _moment;

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit, OnDestroy {

  movie: Movie | null = null;

  selectedStepIndex: number = 0;

  screenUrl: string = "assets/mocks/screen_test.json";
  seatsTaken: string[] = ['A-1', 'A-2', 'C-2'];

  theaterFilter: TheaterFilter | null = null;

  cities: string[] = [];
  filteredCities: Observable<string[]> = new Observable<string[]>;

  cinemas: string[] = [];
  filteredCinemas: Observable<string[]> = new Observable<string[]>;

  projTypes: string[] = [];
  languages: string[] = [];

  dates: string[] = [];
  minShowDate = moment();
  maxShowDate = moment();

  shows: Show[] = [];

  ticketsList: any[] = [
    {
      id: 1,
      name: "Adulti",
      price: 9
    },
    {
      id: 1,
      name: "Bambini",
      price: 7
    },
  ]

  bookingForm = new FormGroup({
    movieId: new FormControl<number | null>(null, Validators.required),
    formArray: new FormArray([
      new FormGroup({
        city: new FormControl<string | null>(null, [Validators.required, AutocompleteValidator.validOption(this.cities)]),
        cinema: new FormControl<string | null>(null, [Validators.required, AutocompleteValidator.validOption(this.cinemas)])
      }),
      new FormGroup({
        projectionType: new FormControl<string | null>(null, Validators.required),
        language: new FormControl<string | null>(null, Validators.required),
        date: new FormControl<moment.Moment | null>(null, Validators.required),
        showId: new FormControl<number | null>(null, Validators.required),
      }),
      new FormGroup({
        tickets: new FormArray([], Validators.minLength(1)),
        seats: new FormControl([], Validators.minLength(1))
      }),
    ]),
  });

  selectedSeatsTotalError: boolean = false;

  booking: any;
  price: number = 0;

  isLoading$: Observable<boolean> = of(false);
  toast$: Observable<Toast | null> = of(null);

  orientation$: Observable<StepperOrientation>;
  subs: Subscription[] = [];

  get formArray() {
    return this.bookingForm.get('formArray');
  }

  get cinemaForm() {
    return this.formArray!.get([0])!;
  }

  get showForm() {
    return this.formArray!.get([1])!;
  }

  get seatForm() {
    return this.formArray!.get([2])!;
  }

  get city() {
    return this.cinemaForm.get('city');
  }

  get cityErrorRequired() {
    return this.city?.errors ? this.city?.errors!['required'] : null;
  }

  get cityErrorValidOption() {
    return this.city?.errors ? this.city?.errors!['validOption'] : null;
  }

  get cinema() {
    return this.cinemaForm.get('cinema');
  }

  get cinemaErrorValidOption() {
    return this.cinema?.errors ? this.cinema?.errors!['validOption'] : null;
  }

  get cinemaErrorRequired() {
    return this.cinema?.errors ? this.cinema?.errors!['required'] : null;
  }

  get date() {
    return this.showForm.get('date');
  }

  get showId() {
    return this.showForm.get('showId');
  }

  get tickets() {
    return (this.seatForm.get('tickets') as FormArray);
  }

  get seats() {
    return this.seatForm.get('seats');
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private store: Store,
  ) {
    this.orientation$ = this.breakpointObserver.observe('(min-width: 768px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit() {
    this.store.select(RouterSelectors.selectParams).pipe(take(1)).subscribe(params => {
      if (params && params.movieId) {
        this.store.dispatch(BookingFormActions.loadFilter({ movieId: params.movieId }));
        this.store.dispatch(BookingFormActions.loadMovie({ id: params.movieId }));
      }
    });

    this.isLoading$ = this.store.select(BookingFormSelectors.selectIsLoading);
    this.toast$ = this.store.select(BookingFormSelectors.selectToast);

    this.subs.push(this.store.select(BookingFormSelectors.selectTheaterFilter).subscribe(filter => {
      if (filter) {
        this.setupSearchFilters(filter);
      }
    }));

    this.subs.push(this.store.select(BookingFormSelectors.selectMovie).subscribe(movie => {
      this.movie = movie;
    }));

    this.subs.push(this.store.select(BookingFormSelectors.selectShows).subscribe(shows => {
      this.shows = shows;
      this.projTypes = [...new Set(shows.map(s => s.projectionType))];
      this.languages = [...new Set(shows.map(s => s.language))];
      this.dates = [...new Set(shows.map(s => moment(s.date).format('YYYY-MM-DD')))];
      this.minShowDate = moment.min(shows.map(s => moment(s.date)));
      this.maxShowDate = moment.max(shows.map(s => moment(s.date)));

      this.showForm.patchValue({
        projectionType: this.projTypes[0],
        language: this.languages[0],
      });
    }));

    this.addTicketsForm();
  }

  addTicketsForm() {
    this.ticketsList.forEach(ticket => {
      this.tickets!.push(
        new FormGroup({
          name: new FormControl(ticket.name, Validators.required),
          price: new FormControl(ticket.price, Validators.required),
          quantity: new FormControl(0),
        })
      );
    });

    this.subs.push(this.tickets.valueChanges.subscribe((values: any[]) => {
      this.price = values.reduce((sum, value) => sum + (value.price * value.quantity), 0);

      const { seats } = this.seatForm.value;
      this.selectedSeatsTotalError = seats.length !== values.reduce((sum, value) => sum + value.quantity, 0);
    }));
  }

  // TODO: molto simile a MovieListComponent
  private setupSearchFilters(filter: TheaterFilter) {
    this.theaterFilter = filter;
    this.cities = filter.cities.map(c => c.name);
    this.cinemas = [];
    filter.cities.forEach(city => this.cinemas = this.cinemas.concat(city.theaters));

    // Update parameters for the AutocompleteValidator
    this.city?.setValidators([Validators.required, AutocompleteValidator.validOption(this.cities)]);
    this.cinema?.setValidators([Validators.required, AutocompleteValidator.validOption(this.cinemas)]);

    this.filteredCities = this.cinemaForm.get('city')!.valueChanges.pipe(
      startWith(''),
      map(value => this.autoCompletefilter(value || '', this.cities)),
    );

    this.filteredCinemas = this.cinemaForm.get('cinema')!.valueChanges.pipe(
      startWith(''),
      map(value => this.autoCompletefilter(value || '', this.cinemas)),
    );

    this.subs.push(this.cinemaForm.get('city')!.valueChanges.subscribe((value: string | null) => {
      const valid = this.theaterFilter?.cities.find(c => c.name === value);
      this.cinemas = valid ? valid.theaters : [];

      // Trigger di valueChanges per aggiornare filteredCinemas
      this.cinemaForm.patchValue({
        cinema: this.cinemaForm.get('cinema')?.value
      });
    }));
  }

  private autoCompletefilter(value: string, list: string[]): string[] {
    const filterValue = value.toLowerCase();
    return list.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  filterValidDates(date: moment.Moment | null): boolean {
    const dateStr = date?.format('YYYY-MM-DD');
    return this.dates.findIndex(d => d === dateStr) > -1;
  };
  boundFilterValidDates = this.filterValidDates.bind(this);

  onStepChanged(event: StepperSelectionEvent) {
    this.selectedStepIndex = event.selectedIndex;

    if (this.selectedStepIndex === 1) {
      this.loadShows();
    } else if (this.selectedStepIndex === 2) {
      this.loadSeats();
    } else if (this.selectedStepIndex === 3) {
      this.createBookingSummary();
    }
  }

  loadShows() {
    const cinemaVals = this.cinemaForm.value;
    const filter: MovieFilter = {
      city: cinemaVals.city,
      cinema: cinemaVals.cinema,
      movieId: this.movie?.id,
    }
    this.store.dispatch(BookingFormActions.loadShowsList({ filter }));
  }

  loadSeats() {
    const showVals = this.showForm.value;
    const filtered = this.shows.filter(s => s.id === showVals.showId);

    if (filtered.length > 0) {
      // TODO: load biglietti, posti prenotati, seatChart
    }
  }

  createBookingSummary() {
    const cinemaVals = this.cinemaForm.value;
    const showVals = this.showForm.value;
    const seatsVals = this.seatForm.value;

    this.booking = {
      ...cinemaVals,
      ...showVals,
      ...seatsVals,
      startTime: this.getShowStartTime(showVals.showId),
      date: showVals.date.toISOString(),
      price: this.price,
      movie: {
        ...this.movie,
      }
    };
  }

  onSeatSelected(seats: string[]) {
    this.seatForm.patchValue({
      seats: seats
    });

    const tickets = this.seatForm.value.tickets as any[];
    this.selectedSeatsTotalError = seats.length !== tickets.reduce((sum, value) => sum + value.quantity, 0);
  }

  getShowStartTime(showId: number) {
    const filtered = this.shows.filter(s => s.id === showId);
    return filtered.length > 0 ? filtered[0].startTime : '';
  }

  getTicketsControls() {
    return this.tickets.controls as FormControl[];
  }

  getTicketProperty(fc: FormControl, prop: string) {
    return fc.get(prop)! as FormControl;
  }

  seatErrorRequired() {
    return this.tickets.controls.some(t => t.dirty) && this.tickets.controls.every(t => t.value.quantity === 0);
  }

  onSubmit() {
    console.log("Submitted");
    const bookingId = 1;
    this.router.navigate(['/booking-list', bookingId]);
  }

}
