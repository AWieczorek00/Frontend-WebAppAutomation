import { NgModule } from '@angular/core';
import { OrderState } from './order.state';
import { LOAD_ORDER_COMMAND_PORT } from './ports/primary/command/load-orders.command-port';
import { GETS_CURRENT_ORDER_LIST_QUERY_PORT } from './ports/primary/query/gets-current-order-list.query-port';

@NgModule({
  imports: [],
  declarations: [],
  providers: [OrderState, { provide: LOAD_ORDER_COMMAND_PORT, useExisting: OrderState }, { provide: GETS_CURRENT_ORDER_LIST_QUERY_PORT, useExisting: OrderState }],
  exports: []
})
export class OrderStateModule {
}
