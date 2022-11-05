import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list.component';
import {MatTableModule} from "@angular/material/table";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    NgbModule,
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [OrderListComponent],
  providers: [],
  exports: [OrderListComponent],
})
export class OrderListComponentModule {}
