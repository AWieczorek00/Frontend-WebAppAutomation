import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './order-details.component';
import {MatTabsModule} from "@angular/material/tabs";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonModule} from "@angular/material/button";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTableModule} from "@angular/material/table";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  imports: [
    MatTabsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatGridListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTableModule,
    NgbDropdownModule,
    MatIconModule,
  ],
  declarations: [OrderDetailsComponent],
  providers: [],
  exports: [OrderDetailsComponent],
})
export class OrderDetailsComponentModule {}
