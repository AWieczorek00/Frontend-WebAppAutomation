import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderContext } from './order.context';

export const SETS_STATE_ORDER_CONTEXT_PORT = new InjectionToken<SetsStateOrderContextPort>('SETS_STATE_ORDER_CONTEXT_PORT');

export interface SetsStateOrderContextPort {
  setState(state: OrderContext): Observable<void>;
}
