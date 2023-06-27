import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookingFormComponent } from './container/booking-form.component';
import { BookingFormEffects } from './store/effects/booking-form.effects';
import * as fromBookingForm from './store/reducers/booking-form.reducer';



const routes: Routes = [
  {
    path: '',
    component: BookingFormComponent,
  },
];

@NgModule({
  declarations: [
    BookingFormComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromBookingForm.bookingFormFeatureKey, fromBookingForm.reducer),
    EffectsModule.forFeature([BookingFormEffects]),MatStepperModule,
    MatRadioModule,
    MatDatepickerModule,
    MatChipsModule,
  ]
})
export class BookingFormModule { }
