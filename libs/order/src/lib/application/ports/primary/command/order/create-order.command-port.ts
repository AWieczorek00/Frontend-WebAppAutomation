import { InjectionToken } from '@angular/core';
import {CreateOrderCommand} from "./create-order.command";
import {Observable} from "rxjs";

export const CREATE_ORDER_COMMAND_PORT = new InjectionToken<CreateOrderCommandPort>('CREATE_ORDER_COMMAND_PORT');

export interface CreateOrderCommandPort {
  createOrder(command:CreateOrderCommand):Observable<void>;
}
