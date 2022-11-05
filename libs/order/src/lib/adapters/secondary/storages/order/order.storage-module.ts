import { NgModule } from '@angular/core';
import { OrderStorage } from './order.storage';
import { SETS_STATE_ORDER_CONTEXT_PORT } from '../../../../application/ports/secondary/context/order/sets-state-order.context-port';
import { SELECT_ORDER_CONTEXT_PORT } from '../../../../application/ports/secondary/context/order/select-order.context-port';

@NgModule({
  imports: [],
  declarations: [],
  providers: [OrderStorage, { provide: SETS_STATE_ORDER_CONTEXT_PORT, useExisting: OrderStorage }, { provide: SELECT_ORDER_CONTEXT_PORT, useExisting: OrderStorage }],
  exports: []
})
export class OrderStorageModule {
}
