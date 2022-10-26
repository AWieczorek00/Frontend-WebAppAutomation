import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderListQuery } from './order-list.query';

export const GETS_CURRENT_ORDER_LIST_QUERY_PORT = new InjectionToken<GetsCurrentOrderListQueryPort>('GETS_CURRENT_ORDER_LIST_QUERY_PORT');

export interface GetsCurrentOrderListQueryPort {
  getCurrentOrderList(): Observable<OrderListQuery>;
}
