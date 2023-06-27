import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookingListComponent } from './container/booking-list.component';
import { BookingListEffects } from './store/effects/booking-list.effects';
import * as fromBookingList from './store/reducers/booking-list.reducer';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: BookingListComponent,
  },
];


@NgModule({
  declarations: [
    BookingListComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromBookingList.bookingListFeatureKey, fromBookingList.reducer),
    EffectsModule.forFeature([BookingListEffects]),
  ]
})
export class BookingListModule { }
