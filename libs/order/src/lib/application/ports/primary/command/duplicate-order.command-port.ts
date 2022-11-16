import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { DuplicateOrderCommand } from './duplicate-order.command';

export const DUPLICATE_ORDER_COMMAND_PORT = new InjectionToken<DuplicateOrderCommandPort>('DUPLICATE_ORDER_COMMAND_PORT');

export interface DuplicateOrderCommandPort {
  duplicateOrder(command: DuplicateOrderCommand): Observable<void>;
}
