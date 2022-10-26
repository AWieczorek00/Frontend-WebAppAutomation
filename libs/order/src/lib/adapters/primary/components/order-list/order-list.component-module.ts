import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [OrderListComponent],
  providers: [],
  exports: [OrderListComponent]
})
export class OrderListComponentModule {
}
