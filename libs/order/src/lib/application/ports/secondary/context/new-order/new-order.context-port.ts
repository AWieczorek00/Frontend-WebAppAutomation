import { InjectionToken } from '@angular/core';
import {NewOrderContext} from "./new-order.context";
import {Observable} from "rxjs";

export const NEW_ORDER_CONTEXT_PORT = new InjectionToken<NewOrderContextPort>('NEW_ORDER_CONTEXT_PORT');

export interface NewOrderContextPort {
  patch(state: Partial<NewOrderContext>): Observable<void>;
  select():Observable<NewOrderContext>
}
