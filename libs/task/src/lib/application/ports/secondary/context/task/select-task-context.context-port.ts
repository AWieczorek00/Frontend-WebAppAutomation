import { InjectionToken } from '@angular/core';
import {Observable} from "rxjs";
import {
  OrderContext
} from "../../../../../../../../order/src/lib/application/ports/secondary/context/order/order.context";
import {TaskContext} from "./task.context";

export const SELECT_TASK_CONTEXT_CONTEXT_PORT = new InjectionToken<SelectTaskContextContextPort>('SELECT_TASK_CONTEXT_CONTEXT_PORT');

export interface SelectTaskContextContextPort {
  select(): Observable<TaskContext>;
}
