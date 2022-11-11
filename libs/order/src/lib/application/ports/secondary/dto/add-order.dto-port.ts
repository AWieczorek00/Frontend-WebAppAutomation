import { InjectionToken } from '@angular/core';
import {OrderDto} from "./order.dto";
import {Observable} from "rxjs";

export const ADD_ORDER_DTO_PORT = new InjectionToken<AddOrderDtoPort>('ADD_ORDER_DTO_PORT');

export interface AddOrderDtoPort {

  add(orderDto:Partial<OrderDto>):Observable<void>
}
