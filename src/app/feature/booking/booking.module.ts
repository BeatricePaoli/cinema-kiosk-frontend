import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './container/booking.component';
import { StoreModule } from '@ngrx/store';
import * as fromBooking from './store/reducers/booking.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BookingEffects } from './store/effects/booking.effects';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: BookingComponent,
  },
];

@NgModule({
  declarations: [
    BookingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromBooking.bookingFeatureKey, fromBooking.reducer),
    EffectsModule.forFeature([BookingEffects])
  ]
})
export class BookingModule { }
