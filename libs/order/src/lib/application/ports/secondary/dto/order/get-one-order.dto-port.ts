import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDto } from './order.dto';

export const GET_ONE_ORDER_DTO_PORT = new InjectionToken<GetOneOrderDtoPort>('GET_ONE_ORDER_DTO_PORT');

export interface GetOneOrderDtoPort {
  getOneOrder(id:number): Observable<OrderDto>;
}
