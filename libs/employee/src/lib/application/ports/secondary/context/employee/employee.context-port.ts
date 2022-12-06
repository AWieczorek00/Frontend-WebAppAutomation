import { InjectionToken } from '@angular/core';

import {Observable} from "rxjs";
import {EmployeeContext} from "./employee.context";

export const EMPLOYEE_CONTEXT_PORT = new InjectionToken<EmployeeContextPort>('EMPLOYEE_CONTEXT_PORT');

export interface EmployeeContextPort {
  setState(state: EmployeeContext): Observable<void>;
  select():Observable<EmployeeContext>
}
