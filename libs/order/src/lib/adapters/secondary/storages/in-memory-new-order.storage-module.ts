import { NgModule } from '@angular/core';
import { InMemoryNewOrderStorage } from './in-memory-new-order.storage';
import { NEW_ORDER_CONTEXT_PORT } from '../../../application/ports/secondary/context/new-order/new-order.context-port';

@NgModule({
  imports: [],
  declarations: [],
  providers: [InMemoryNewOrderStorage, { provide: NEW_ORDER_CONTEXT_PORT, useExisting: InMemoryNewOrderStorage }],
  exports: []
})
export class InMemoryNewOrderStorageModule {
}
