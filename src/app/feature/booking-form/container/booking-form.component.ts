import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation, StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import * as _moment from 'moment';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { AutocompleteValidator } from 'src/app/core/validators/autocomplete.validator';

const moment = _moment;

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit, OnDestroy {

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
  ) {
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

  onStepChanged(event: StepperSelectionEvent) {
    this.selectedStepIndex = event.selectedIndex;

    if (this.selectedStepIndex === 3) {
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
