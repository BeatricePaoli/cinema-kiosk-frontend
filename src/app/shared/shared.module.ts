import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { I18nPaginator } from '../core/services/i18n-paginator.service';
import { ActionModalComponent } from './components/action-modal/action-modal.component';
import { BookingSummaryComponent } from './components/booking-summary/booking-summary.component';
import { SeatsEditorComponent } from './components/seats-editor/seats-editor.component';
import { DayFormatDatepickerDirective } from './directives/day-format-datepicker.directive';
import { SpinnerComponent } from './components/spinner/spinner.component';

const IMPORTS = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatAutocompleteModule,
  MatTooltipModule,
  MatDialogModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatSelectModule,
  NgxMaterialTimepickerModule,
];

const DIRECTIVES = [
  DayFormatDatepickerDirective,
]

const COMPONENTS = [
  SeatsEditorComponent,
  ActionModalComponent,
  BookingSummaryComponent,
  SpinnerComponent,
]

@NgModule({
  declarations: [
    DIRECTIVES,
    COMPONENTS,
  ],
  imports: [
    IMPORTS,
  ],
  exports: [
    IMPORTS,
    DIRECTIVES,
    COMPONENTS,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: I18nPaginator }],
})
export class SharedModule { }
