import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeContext } from './employee.context';

export const SET_STATE_EMPLOYEE_CONTEXT_PORT =
  new InjectionToken<SetStateEmployeeContextPort>(
    'SET_STATE_EMPLOYEE_CONTEXT_PORT'
  );

export interface SetStateEmployeeContextPort {
  setState(state: EmployeeContext): Observable<void>;
}
