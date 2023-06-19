import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
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

  screenSVG: string = "/assets/images/screen_test.svg";
  seatsTaken: string[] = ['A1', 'A2', 'C2'];

  cities: string[] = ['One', 'Two', 'Three'];
  filteredCities: Observable<string[]> = new Observable<string[]>;

  cinemas: string[] = ['One', 'Two', 'Three'];
  filteredCinemas: Observable<string[]> = new Observable<string[]>;

  projTypes: string[] = ['2D', '3D'];
  languages: string[] = ['Italiano', 'English'];

  dates: string[] = [ '2023-06-20' ];
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
        adultsSeats: new FormControl<number | null>(null),
        childrenSeats: new FormControl<number | null>(null),
        seats: new FormArray([], Validators.minLength(1))
      }, { validators: MultipleValidator.atLeastOneRequired('adultsSeats', 'childrenSeats') }),
    ]),
  });

  selectedSeatsTotalError: boolean = false;

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

  get adultsSeats() {
    return this.seatForm.get('adultsSeats');
  }

  get childrenSeats() {
    return this.seatForm.get('childrenSeats');
  }

  get seatsErrorRequired() {
    return this.seatForm?.errors ? this.seatForm?.errors!['atLeastOneRequired'] : null;
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

    this.subs.push(this.adultsSeats!.valueChanges.subscribe(value => this.computeSeatsErrors()));
    this.subs.push(this.childrenSeats!.valueChanges.subscribe(value => this.computeSeatsErrors()));
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

  onSeatSelected(seats: string[]) {
    this.seatForm.patchValue({
      seats: seats
    });
    this.computeSeatsErrors();
  }

  computeSeatsErrors() {
    const { adultsSeats, childrenSeats, seats } = this.seatForm.value;
    this.selectedSeatsTotalError = adultsSeats + childrenSeats !== seats.length;
  }

  onSubmit() {

  }

}
