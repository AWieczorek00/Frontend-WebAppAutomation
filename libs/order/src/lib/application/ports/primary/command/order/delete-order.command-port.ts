import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { DeleteOrderCommand } from './delete-order.command';

export const DELETE_ORDER_COMMAND_PORT = new InjectionToken<DeleteOrderCommandPort>('DELETE_ORDER_COMMAND_PORT');

export interface DeleteOrderCommandPort {
  deleteOrder(command: DeleteOrderCommand): Observable<void>;
}
