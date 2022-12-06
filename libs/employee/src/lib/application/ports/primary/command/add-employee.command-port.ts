import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { AddEmployeeCommand } from './add-employee.command';

export const ADD_EMPLOYEE_COMMAND_PORT =
  new InjectionToken<AddEmployeeCommandPort>('ADD_EMPLOYEE_COMMAND_PORT');

export interface AddEmployeeCommandPort {
  add(command: AddEmployeeCommand): Observable<void>;
}
