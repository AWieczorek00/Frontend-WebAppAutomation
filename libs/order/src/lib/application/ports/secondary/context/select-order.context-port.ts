import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderContext } from './order.context';

export const SELECT_ORDER_CONTEXT_PORT = new InjectionToken<SelectOrderContextPort>('SELECT_ORDER_CONTEXT_PORT');

export interface SelectOrderContextPort {
  select(): Observable<OrderContext>;
}
