import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation, StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _moment from 'moment';
import { Observable, Subscription, map, of, take } from 'rxjs';
import { Movie } from 'src/app/core/models/movie';
import { Show, ShowFilter } from 'src/app/core/models/show';
import { AutocompleteTheaterFilter, TheaterFilter, TheaterScreen } from 'src/app/core/models/theater';
import { TicketType } from 'src/app/core/models/tickets';
import { Toast } from 'src/app/core/models/toast';
import * as RouterSelectors from 'src/app/core/router/router.selectors';
import { setupSearchFilters } from 'src/app/core/utils/autocomplete-utils';
import { AutocompleteValidator } from 'src/app/core/validators/autocomplete.validator';
import { BookingFormActions } from '../store/actions/booking-form.actions';
import * as BookingFormSelectors from '../store/selectors/booking-form.selectors';
import { Booking } from 'src/app/core/models/booking';

const moment = _moment;

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit, OnDestroy {

  movie: Movie | null = null;

  selectedStepIndex: number = 0;

  seatsTaken: string[] = [];

  theaterFilter: AutocompleteTheaterFilter | null = null;

  cities: string[] = [];
  filteredCities: Observable<string[]> = new Observable<string[]>;

  theaters: TheaterFilter[] = [];
  filteredTheaters: Observable<TheaterFilter[]> = new Observable<TheaterFilter[]>;

  projTypes: string[] = [];
  languages: string[] = [];

  dates: string[] = [];
  minShowDate = moment();
  maxShowDate = moment();
  shows: Show[] = [];

  screen?: TheaterScreen;
  ticketsList: TicketType[] = [];

  bookingForm = new FormGroup({
    movieId: new FormControl<number | null>(null, Validators.required),
    formArray: new FormArray([
      new FormGroup({
        city: new FormControl<string | null>(null, [Validators.required, AutocompleteValidator.validOption(this.cities)]),
        theater: new FormControl<TheaterFilter | null>(null, [Validators.required, AutocompleteValidator.validOption(this.theaters)])
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

  booking: Booking | null = null;
  price: number = 0;

  isLoading$: Observable<boolean> = of(false);
  toast$: Observable<Toast | null> = of(null);

  orientation$: Observable<StepperOrientation>;
  subs: Subscription[] = [];

  get formArray() {
    return this.bookingForm.get('formArray');
  }

  get theaterForm() {
    return this.formArray!.get([0])!;
  }

  get showForm() {
    return this.formArray!.get([1])!;
  }

  get seatForm() {
    return this.formArray!.get([2])!;
  }

  get city() {
    return this.theaterForm.get('city');
  }

  get cityErrorRequired() {
    return this.city?.errors ? this.city?.errors!['required'] : null;
  }

  get cityErrorValidOption() {
    return this.city?.errors ? this.city?.errors!['validOption'] : null;
  }

  get theater() {
    return this.theaterForm.get('theater');
  }

  get theaterErrorValidOption() {
    return this.theater?.errors ? this.theater?.errors!['validOption'] : null;
  }

  get theaterErrorRequired() {
    return this.theater?.errors ? this.theater?.errors!['required'] : null;
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

    this.subs.push(this.store.select(BookingFormSelectors.selectTicketTypes).subscribe(tickets => {
      this.ticketsList = tickets;
      this.addTicketsForm();
    }));

    this.subs.push(this.store.select(BookingFormSelectors.selectSavedBookingId).subscribe(id => {
      if (id) {
        this.router.navigate(['/booking-list', id]);
      }
    }));
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

  private setupSearchFilters(filter: AutocompleteTheaterFilter) {
    this.theaterFilter = filter;

    const { cities, theaters, filteredCities, filteredTheaters } = setupSearchFilters(filter, this.theaterForm, this.subs);
    this.cities = cities;
    this.theaters = theaters;
    this.filteredCities = filteredCities;
    this.filteredTheaters = filteredTheaters;

    // Update parameters for the AutocompleteValidator
    this.city?.setValidators([Validators.required, AutocompleteValidator.validOption(this.cities)]);
    this.theater?.setValidators([Validators.required, AutocompleteValidator.validOption(this.theaters)]);
  }

  displayFnTheater(theater: TheaterFilter): string {
    return theater && theater.name ? theater.name : '';
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
      this.loadTicketTypes();
      this.loadShows();
    } else if (this.selectedStepIndex === 2) {
      this.loadSeats();
    } else if (this.selectedStepIndex === 3) {
      this.createBookingSummary();
    }
  }

  loadTicketTypes() {
    const theaterVals = this.theaterForm.value;
    this.store.dispatch(BookingFormActions.loadTicketTypesList({ id: theaterVals.theater.id }));
  }

  loadShows() {
    const TheaterVals = this.theaterForm.value;
    const filter: ShowFilter = {
      city: TheaterVals.city,
      theaterId: TheaterVals.theater.id,
      movieId: this.movie?.id ?? -1,
      getBookedSeats: true,
    }
    this.store.dispatch(BookingFormActions.loadShowsList({ filter }));
  }

  loadSeats() {
    const showVals = this.showForm.value;
    const filtered = this.shows.filter(s => s.id === showVals.showId);

    if (filtered.length > 0) {
      this.screen = filtered[0].screen;
      this.seatsTaken = filtered[0].seatsTaken.map(st => st.label);
    }
  }

  createBookingSummary() {
    const theaterVals = this.theaterForm.value;
    const showVals = this.showForm.value;
    const seatsVals = this.seatForm.value;

    this.booking = {
      ...theaterVals,
      ...showVals,
      seats: seatsVals.seats.map((s: string) => { return { label: s} }),
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
    if (this.booking) {
      this.store.dispatch(BookingFormActions.saveBooking({ booking: this.booking }));
    }
  }

}
