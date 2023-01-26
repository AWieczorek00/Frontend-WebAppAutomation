import { NgModule } from '@angular/core';
import { OrderState } from './order.state';
import { LOAD_ORDER_COMMAND_PORT } from './ports/primary/command/order/load-orders.command-port';
import { GETS_CURRENT_ORDER_LIST_QUERY_PORT } from './ports/primary/query/gets-current-order-list.query-port';
import { LOAD_CLIENTS_COMMAND_PORT } from './ports/primary/command/client/load-clients.command-port';
import { GETS_CURRENT_CLIENT_LIST_QUERY_PORT } from './ports/primary/query/gets-current-client-list.query-port';
import { LOAD_EMPLOYEE_COMMAND_PORT } from './ports/primary/command/employee/load-employees.command-port';
import { GETS_NEW_ORDER_CURRENCY_ELEMENTS_QUERY_PORT } from './ports/primary/query/gets-new-order-currency-elements.query-port';
import { LOAD_ACTIVITIES_TEMPLATE_COMMAND_PORT } from './ports/primary/command/activitiesTemplate/load-activities-template.command-port';
import { CREATE_ORDER_COMMAND_PORT } from './ports/primary/command/order/create-order.command-port';
import { LOAD_PARTS_ACTIVITIES_COMMAND_PORT } from './ports/primary/command/partsTemplate/load-parts-template.command-port';
import { DELETE_ORDER_COMMAND_PORT } from './ports/primary/command/order/delete-order.command-port';
import { DUPLICATE_ORDER_COMMAND_PORT } from './ports/primary/command/duplicate-order.command-port';
import { UPDATE_ORDER_COMMAND_PORT } from './ports/primary/command/order/update-order.command-port';
import { ADD_ACTIVITIES_TEMPLATE_COMMAND_PORT } from './ports/primary/command/partsTemplate/add-activities-template.command-port';
import { PDF_ORDER_COMMAND_PORT } from './ports/primary/command/order/pdf-order.command-port';
import { INVOICE_PDF_COMMAND_PORT } from './ports/primary/command/order/invoice-pdf.command-port';

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
    { provide: GETS_NEW_ORDER_CURRENCY_ELEMENTS_QUERY_PORT, useExisting: OrderState },
    { provide: LOAD_ACTIVITIES_TEMPLATE_COMMAND_PORT, useExisting: OrderState },
    { provide: CREATE_ORDER_COMMAND_PORT, useExisting: OrderState },
    { provide: LOAD_PARTS_ACTIVITIES_COMMAND_PORT, useExisting: OrderState },
    { provide: DELETE_ORDER_COMMAND_PORT, useExisting: OrderState },
    { provide: DUPLICATE_ORDER_COMMAND_PORT, useExisting: OrderState },
    { provide: UPDATE_ORDER_COMMAND_PORT, useExisting: OrderState },
    { provide: ADD_ACTIVITIES_TEMPLATE_COMMAND_PORT, useExisting: OrderState },
    { provide: PDF_ORDER_COMMAND_PORT, useExisting: OrderState },
    { provide: INVOICE_PDF_COMMAND_PORT, useExisting: OrderState }
  ],
  exports: [],
})
export class OrderStateModule { }
