import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { ScreenListComponent } from './components/screen-list/screen-list.component';
import { TheaterFormComponent } from './components/theater-form/theater-form.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { TheaterComponent } from './container/theater.component';
import { TheaterEffects } from './store/effects/theater.effects';
import * as fromTheater from './store/reducers/theater.reducer';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';


const routes: Routes = [
  {
    path: '',
    component: TheaterComponent,
  },
];


@NgModule({
  declarations: [
    TheaterComponent,
    TheaterFormComponent,
    ScreenListComponent,
    TicketListComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromTheater.theaterFeatureKey, fromTheater.reducer),
    EffectsModule.forFeature([TheaterEffects]),
    MatCheckboxModule,
    MatSelectModule,
    NgxMaterialTimepickerModule,
  ]
})
export class TheaterModule { }
