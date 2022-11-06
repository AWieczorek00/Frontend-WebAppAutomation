import { NgModule } from '@angular/core';
import { OrderState } from './order.state';
import { LOAD_ORDER_COMMAND_PORT } from './ports/primary/command/order/load-orders.command-port';
import { GETS_CURRENT_ORDER_LIST_QUERY_PORT } from './ports/primary/query/gets-current-order-list.query-port';
import { LOAD_CLIENTS_COMMAND_PORT } from './ports/primary/command/client/load-clients.command-port';
import { GETS_CURRENT_CLIENT_LIST_QUERY_PORT } from './ports/primary/query/gets-current-client-list.query-port';
import { LOAD_EMPLOYEE_COMMAND_PORT } from './ports/primary/command/employee/load-employees.command-port';
import { GETS_NEW_ORDER_CURRENCY_ELEMENTS_QUERY_PORT } from './ports/primary/query/gets-new-order-currency-elements.query-port';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    OrderState,
    { provide: LOAD_ORDER_COMMAND_PORT, useExisting: OrderState },
    { provide: GETS_CURRENT_ORDER_LIST_QUERY_PORT, useExisting: OrderState },
    { provide: LOAD_CLIENTS_COMMAND_PORT, useExisting: OrderState },
    { provide: GETS_CURRENT_CLIENT_LIST_QUERY_PORT, useExisting: OrderState },
    { provide: LOAD_EMPLOYEE_COMMAND_PORT, useExisting: OrderState },
    { provide: GETS_NEW_ORDER_CURRENCY_ELEMENTS_QUERY_PORT, useExisting: OrderState }
  ],
  exports: [],
})
export class OrderStateModule { }