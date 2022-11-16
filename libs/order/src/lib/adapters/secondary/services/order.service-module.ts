import { NgModule } from '@angular/core';
import { OrderService } from './order.service';
import { GET_ALL_DTO_PORT } from '../../../application/ports/secondary/dto/get-all.dto-port';
import { ADD_ORDER_DTO_PORT } from '../../../application/ports/secondary/dto/add-order.dto-port';
import { DELETE_ORDER_DTO_PORT } from '../../../application/ports/secondary/dto/delete-order.dto-port';

@NgModule({
  imports: [],
  declarations: [],
  providers: [OrderService, { provide: GET_ALL_DTO_PORT, useExisting: OrderService }, { provide: ADD_ORDER_DTO_PORT, useExisting: OrderService }, { provide: DELETE_ORDER_DTO_PORT, useExisting: OrderService }],
  exports: []
})
export class OrderServiceModule {
}
