import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-theater-form',
  templateUrl: './theater-form.component.html',
  styleUrls: ['./theater-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TheaterFormComponent implements OnChanges {

  @Input()
  theater: any;

  @Output()
  onSave: EventEmitter<any> = new EventEmitter<any>();

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['theater'] && changes['theater'].currentValue) {
      const theater = changes['theater'].currentValue;

      this.theaterForm.patchValue({
        name: theater.name,
        city: theater.address.city,
        country: theater.address.country,
        street: theater.address.street,
        number: theater.address.number,
        zipCode: theater.address.zipCode,
      });
    }
  }

  onSubmit() {
    this.onSave.emit(this.theaterForm.value);
  }

}
