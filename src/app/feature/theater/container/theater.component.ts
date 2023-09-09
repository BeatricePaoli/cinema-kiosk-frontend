import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, of, take } from 'rxjs';
import { Theater } from 'src/app/core/models/theater';
import { Toast } from 'src/app/core/models/toast';
import * as RouterSelectors from 'src/app/core/router/router.selectors';
import { TheaterActions } from '../store/actions/theater.actions';
import * as TheaterSelectors from '../store/selectors/theater.selectors';

@Component({
  selector: 'app-theater',
  templateUrl: './theater.component.html',
  styleUrls: ['./theater.component.scss']
})
export class TheaterComponent implements OnInit, OnDestroy {

  theaterId?: number;
  theater: Theater | null = null;

  theaterForm = new FormGroup({
    name: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    zipCode: new FormControl('', Validators.required),
  });

  isLoading$: Observable<boolean> = of(false);
  toast$: Observable<Toast | null> = of(null);

  get name() {
    return this.theaterForm.get('name');
  }

  get nameErrorRequired() {
    return this.name?.errors ? this.name?.errors!['required'] : null;
  }

  get city() {
    return this.theaterForm.get('city');
  }

  get cityErrorRequired() {
    return this.city?.errors ? this.city?.errors!['required'] : null;
  }

  get country() {
    return this.theaterForm.get('country');
  }

  get countryErrorRequired() {
    return this.country?.errors ? this.country?.errors!['required'] : null;
  }

  get street() {
    return this.theaterForm.get('street');
  }

  get streetErrorRequired() {
    return this.street?.errors ? this.street?.errors!['required'] : null;
  }

  get number() {
    return this.theaterForm.get('number');
  }

  get numberErrorRequired() {
    return this.number?.errors ? this.number?.errors!['required'] : null;
  }

  get zipCode() {
    return this.theaterForm.get('zipCode');
  }

  get zipCodeErrorRequired() {
    return this.zipCode?.errors ? this.zipCode?.errors!['required'] : null;
  }

  subs: Subscription[] = [];

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.store.select(RouterSelectors.selectParams).pipe(take(1)).subscribe(params => {
      if (params && params.theaterId) {
        const id = parseInt(params.theaterId);
        if (!Number.isNaN(id)) {
          this.theaterId = id;
          this.store.dispatch(TheaterActions.loadTheater({ id }));
        }
      }
    });

    this.subs.push(this.store.select(TheaterSelectors.selectTheater).subscribe(theater => {
      if (theater) {
        this.theater = theater;
        this.theaterForm.patchValue({
          name: this.theater.name,
          city: this.theater.address.city,
          country: this.theater.address.country,
          street: this.theater.address.street,
          number: this.theater.address.number,
          zipCode: this.theater.address.zipCode,
        });
      }
    }));

    this.subs.push(this.store.select(TheaterSelectors.selectSavedTheaterId).subscribe(id => {
      if (id && !this.theaterId) {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/theater-list', id]);
        });
        this.store.dispatch(TheaterActions.resetSavedTheaterId());
      }
    }));

    this.isLoading$ = this.store.select(TheaterSelectors.selectIsLoading);
    this.toast$ = this.store.select(TheaterSelectors.selectToast);
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  onSubmit() {
    const formVals = this.theaterForm.value;
    const theater: Theater = {
      id: this.theater ? this.theater.id : undefined,
      name: formVals.name!,
      address: {
        id: this.theater ? this.theater.address.id : undefined,
        street: formVals.street!,
        city: formVals.city!,
        number: formVals.number!,
        country: formVals.country!,
        zipCode: formVals.zipCode!,
      }
    }
    this.store.dispatch(TheaterActions.saveTheater({ theater }));
  }
}
