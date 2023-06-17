import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DayFormatDatepickerDirective } from 'src/app/shared/directives/day-format-datepicker.directive';
import { BookingComponent } from './container/booking.component';
import { BookingEffects } from './store/effects/booking.effects';
import * as fromBooking from './store/reducers/booking.reducer';



const routes: Routes = [
  {
    path: '',
    component: BookingComponent,
  },
];

@NgModule({
  declarations: [
    BookingComponent,
    DayFormatDatepickerDirective, // TODO: da spostare in shared module
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromBooking.bookingFeatureKey, fromBooking.reducer),
    EffectsModule.forFeature([BookingEffects]),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatDatepickerModule,
    MatChipsModule,
  ]
})
export class BookingModule { }
