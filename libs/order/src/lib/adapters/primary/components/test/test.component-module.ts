import { NgModule } from '@angular/core';
import { TestComponent } from './test.component';
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldControl, MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MatButtonModule} from "@angular/material/button";
import {DeleteOrderDirectiveModule} from "../../directives/delete-order.directive-module";
import {RouterModule} from "@angular/router";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    NgbModule,
    MatIconModule,
    MatButtonModule,
    DeleteOrderDirectiveModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  declarations: [TestComponent],
  providers: [],
  exports: [TestComponent],
})
export class TestComponentModule {}
