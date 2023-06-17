import { NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
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
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromBooking.bookingFeatureKey, fromBooking.reducer),
    EffectsModule.forFeature([BookingEffects]),
    MatStepperModule,
    MatRadioModule,
    MatDatepickerModule,
    MatChipsModule,
  ]
})
export class BookingModule { }
