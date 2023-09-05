import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import * as RouterSelectors from 'src/app/core/router/router.selectors';

@Component({
  selector: 'app-theater',
  templateUrl: './theater.component.html',
  styleUrls: ['./theater.component.scss']
})
export class TheaterComponent implements OnInit {

  theaterId?: number;
  theater: any;

  theaterForm = new FormGroup({
    name: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    zipCode: new FormControl('', Validators.required),
  });

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

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(RouterSelectors.selectParams).pipe(take(1)).subscribe(params => {
      if (params && params.theaterId) {
        const id = parseInt(params.theaterId);
        if (!Number.isNaN(id)) {
          this.theaterId = id;

          this.theater = {
            id: 1,
            name: "Cinema 1",
            address: {
              id: 1,
              street: "Via Pinco Pallino",
              number: "8",
              city: "Firenze",
              country: "Italia",
              zipCode: 10000
            }
          };

          this.theaterForm.patchValue({
            name: this.theater.name,
            city: this.theater.address.city,
            country: this.theater.address.country,
            street: this.theater.address.street,
            number: this.theater.address.number,
            zipCode: this.theater.address.zipCode,
          });

        }
      }
    })
  }

  onSubmit() {
    console.log(this.theaterForm.value);
  }
}
