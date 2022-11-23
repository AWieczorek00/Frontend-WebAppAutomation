import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateOrderCommand } from './update-order.command';

export const UPDATE_ORDER_COMMAND_PORT = new InjectionToken<UpdateOrderCommandPort>('UPDATE_ORDER_COMMAND_PORT');

export interface UpdateOrderCommandPort {
  updateOrder(command: UpdateOrderCommand): Observable<void>;
}
