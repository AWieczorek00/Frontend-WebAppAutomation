import { NgModule } from '@angular/core';
import { OrderListComponent } from './order-list.component';
import {MatTableModule} from "@angular/material/table";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {DeleteOrderDirectiveModule} from "../../directives/delete-order.directive-module";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTreeModule} from "@angular/material/tree";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CommonModule} from "@angular/common";

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
    MatCheckboxModule,
    MatPaginatorModule,
    MatTreeModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
  ],
  declarations: [OrderListComponent],
  providers: [],
  exports: [OrderListComponent],
})
export class OrderListComponentModule {}
