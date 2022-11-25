import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDto } from './order.dto';

export const PUT_ORDER_DTO_PORT = new InjectionToken<PutOrderDtoPort>('PUT_ORDER_DTO_PORT');

export interface PutOrderDtoPort {
  putOrder(order: Partial<OrderDto>): Observable<void>;
}
