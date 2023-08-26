import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookingValidatorComponent } from './container/booking-validator.component';
import { BookingValidatorEffects } from './store/effects/booking-validator.effects';
import * as fromBookingValidator from './store/reducers/booking-validator.reducer';


const routes: Routes = [
  {
    path: '',
    component: BookingValidatorComponent,
  },
];


@NgModule({
  declarations: [
    BookingValidatorComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromBookingValidator.bookingValidatorFeatureKey, fromBookingValidator.reducer),
    EffectsModule.forFeature([BookingValidatorEffects]),
    ZXingScannerModule,
  ]
})
export class BookingValidatorModule { }
