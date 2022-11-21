import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDto } from './order.dto';

export const DUPLICATE_ORDER_DTO_PORT = new InjectionToken<DuplicateOrderDtoPort>('DUPLICATE_ORDER_DTO_PORT');

export interface DuplicateOrderDtoPort {
  duplicateOrder(id: number): Observable<OrderDto>;

}
