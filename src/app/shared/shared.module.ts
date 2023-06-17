import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DayFormatDatepickerDirective } from './directives/day-format-datepicker.directive';

const IMPORTS = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatAutocompleteModule,
];

const DIRECTIVES = [
  DayFormatDatepickerDirective,
]

@NgModule({
  declarations: [
    DIRECTIVES,
  ],
  imports: [
    IMPORTS,
  ],
  exports: [
    IMPORTS,
    DIRECTIVES,
  ]
})
export class SharedModule { }
