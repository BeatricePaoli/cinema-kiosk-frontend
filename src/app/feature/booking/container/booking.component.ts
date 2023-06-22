import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation, StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipSelectionChange } from '@angular/material/chips';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { AutocompleteValidator } from 'src/app/core/validators/autocomplete.validator';
import { MultipleValidator } from 'src/app/core/validators/multiple.validator';

const moment = _moment;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit, OnDestroy {

  movieId: number = 1;
  movie: any = {
    id: 1,
    name: "Spider-man: Across the Spiderverse",
    img: "https://cinemaadriano.it/images/locandine_film/spider.jpg",
  };

  selectedStepIndex: number = 0;

  screenUrl: string = "assets/mocks/screen_test.json";
  seatsTaken: string[] = ['A-1', 'A-2', 'C-2'];

  cities: string[] = ['One', 'Two', 'Three'];
  filteredCities: Observable<string[]> = new Observable<string[]>;

  cinemas: string[] = ['One', 'Two', 'Three'];
  filteredCinemas: Observable<string[]> = new Observable<string[]>;

  projTypes: string[] = ['2D', '3D'];
  languages: string[] = ['Italiano', 'English'];

  dates: string[] = ['2023-06-20'];
  minShowDate = moment('2023-06-10');
  maxShowDate = moment('2023-06-20');

  shows: any[] = [
    {
      id: 1,
      startTime: '17:30'
    },
    {
      id: 2,
      startTime: '19:30'
    },
    {
      id: 3,
      startTime: '21:30'
    },
    {
      id: 4,
      startTime: '23:30'
    }
  ];

  tickets: any = {
    adults: 9,
    children: 7
  };

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
        adultsSeats: new FormControl<number | null>(null),
        childrenSeats: new FormControl<number | null>(null),
        seats: new FormControl([], Validators.minLength(1))
      }, { validators: MultipleValidator.atLeastOneRequired('adultsSeats', 'childrenSeats') }),
    ]),
  });

  selectedSeatsTotalError: boolean = false;
  price: number = 0;

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

  get adultsSeats() {
    return this.seatForm.get('adultsSeats');
  }

  get childrenSeats() {
    return this.seatForm.get('childrenSeats');
  }

  get seatsErrorRequired() {
    return this.seatForm?.errors ? this.seatForm?.errors!['atLeastOneRequired'] : null;
  }

  get seats() {
    return this.seatForm.get('seats');
  }

  constructor(private breakpointObserver: BreakpointObserver) {
    this.orientation$ = this.breakpointObserver.observe('(min-width: 768px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit() {
    this.filteredCities = this.city!.valueChanges.pipe(
      startWith(''),
      map(value => this.autoCompletefilter(value || '', this.cities)),
    );

    this.filteredCinemas = this.cinema!.valueChanges.pipe(
      startWith(''),
      map(value => this.autoCompletefilter(value || '', this.cinemas)),
    );

    this.subs.push(this.adultsSeats!.valueChanges.subscribe(value => {
      const { childrenSeats, seats } = this.seatForm.value;
      this.selectedSeatsTotalError = value + childrenSeats !== seats.length;

      if (this.tickets) {
        this.price = value * this.tickets.adults + childrenSeats * this.tickets.children;
      }
    }));

    this.subs.push(this.childrenSeats!.valueChanges.subscribe(value => {
      const { adultsSeats, seats } = this.seatForm.value;
      this.selectedSeatsTotalError = adultsSeats + value !== seats.length;

      if (this.tickets) {
        this.price = adultsSeats * this.tickets.adults + value * this.tickets.children;
      }
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  private autoCompletefilter(value: string, list: string[]): string[] {
    const filterValue = value.toLowerCase();
    return list.filter(option => option.toLowerCase().includes(filterValue));
  }

  filterValidDates(date: moment.Moment | null): boolean {
    const dateStr = date?.format('YYYY-MM-DD');
    return this.dates.findIndex(d => d === dateStr) > -1;
  };
  boundFilterValidDates = this.filterValidDates.bind(this);

  onDateSelect(event: MatDatepickerInputEvent<moment.Moment>) {
    console.log("Load shows or filter");
  }

  onShowSelect(event: MatChipSelectionChange) {
    console.log("chip toggle")
  }

  onStepChanged(event: StepperSelectionEvent) {
    this.selectedStepIndex = event.selectedIndex;
  }

  onSeatSelected(seats: string[]) {
    this.seatForm.patchValue({
      seats: seats
    });

    const { adultsSeats, childrenSeats } = this.seatForm.value;
    this.selectedSeatsTotalError = adultsSeats + childrenSeats !== seats.length;
  }

  getDateFormatted(date: moment.Moment) {
    return date ? date.format('DD/MM/YYYY') : '';
  }

  getShowStartTime(showId: number) {
    const filtered = this.shows.filter(s => s.id === showId);
    return filtered.length > 0 ? filtered[0].startTime : '';
  }

  onSubmit() {
    console.log("Submitted")
  }

}
