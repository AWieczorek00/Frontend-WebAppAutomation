import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NewOrderComponent } from './new-order.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {RequestInterceptor} from "../../../../../../../../src/app/request.interceptor";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTableModule} from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';

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
    MatNativeDateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
  ],
  declarations: [NewOrderComponent],
  providers: [],
  exports: [NewOrderComponent],
})
export class NewOrderComponentModule {}
