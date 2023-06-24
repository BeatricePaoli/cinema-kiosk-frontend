import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SeatsEditorComponent } from './components/seats-editor/seats-editor.component';
import { DayFormatDatepickerDirective } from './directives/day-format-datepicker.directive';
import { ActionModalComponent } from './components/action-modal/action-modal.component';

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
];

const DIRECTIVES = [
  DayFormatDatepickerDirective,
]

const COMPONENTS = [
  SeatsEditorComponent,
  ActionModalComponent,
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
  ]
})
export class SharedModule { }
