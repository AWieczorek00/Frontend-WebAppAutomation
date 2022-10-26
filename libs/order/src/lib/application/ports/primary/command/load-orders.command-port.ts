import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadOrdersCommand } from './load-orders.command';

export const LOAD_ORDER_COMMAND_PORT = new InjectionToken<LoadOrdersCommandPort>('LOAD_ORDER_COMMAND_PORT');

export interface LoadOrdersCommandPort {
  loadOrder(command: LoadOrdersCommand): Observable<void>;
}
