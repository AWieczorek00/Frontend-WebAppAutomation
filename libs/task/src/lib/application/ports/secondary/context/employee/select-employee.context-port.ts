import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeContext } from './employee.context';

export const SELECT_EMPLOYEE_CONTEXT_PORT =
  new InjectionToken<SelectEmployeeContextPort>('SELECT_EMPLOYEE_CONTEXT_PORT');

export interface SelectEmployeeContextPort {
  select(): Observable<EmployeeContext>;
}

