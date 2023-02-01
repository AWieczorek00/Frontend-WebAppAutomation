import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddTaskComponent } from './add-task.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {CommonModule, DatePipe} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSelectModule,
  ],
  declarations: [AddTaskComponent],
  providers: [],
  exports: [AddTaskComponent],
})
export class AddTaskComponentModule {}
