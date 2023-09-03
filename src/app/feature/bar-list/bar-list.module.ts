import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { BarListComponent } from './container/bar-list.component';
import { BarListEffects } from './store/effects/bar-list.effects';
import * as fromBarList from './store/reducers/bar-list.reducer';
import { ProductListComponent } from './components/product-list/product-list.component';
import { BarTableComponent } from './components/bar-table/bar-table.component';


const routes: Routes = [
  {
    path: '',
    component: BarListComponent,
  },
];

@NgModule({
  declarations: [
    BarListComponent,
    ProductListComponent,
    BarTableComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromBarList.barListFeatureKey, fromBarList.reducer),
    EffectsModule.forFeature([BarListEffects])
  ]
})
export class BarListModule { }
