import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { CashDeskComponent } from './container/cash-desk.component';
import { CashDeskEffects } from './store/effects/cash-desk.effects';
import * as fromCashDesk from './store/reducers/cash-desk.reducer';


const routes: Routes = [
  {
    path: '',
    component: CashDeskComponent,
  },
];

@NgModule({
  declarations: [
    CashDeskComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromCashDesk.cashDeskFeatureKey, fromCashDesk.reducer),
    EffectsModule.forFeature([CashDeskEffects])
  ]
})
export class CashDeskModule { }
