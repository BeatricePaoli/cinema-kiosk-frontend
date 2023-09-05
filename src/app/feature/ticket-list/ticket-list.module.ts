import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { TicketListComponent } from './container/ticket-list.component';
import { TicketListEffects } from './store/effects/ticket-list.effects';
import * as fromTicketList from './store/reducers/ticket-list.reducer';


const routes: Routes = [
  {
    path: '',
    component: TicketListComponent,
  },
];

@NgModule({
  declarations: [
    TicketListComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromTicketList.ticketListFeatureKey, fromTicketList.reducer),
    EffectsModule.forFeature([TicketListEffects])
  ]
})
export class TicketListModule { }
