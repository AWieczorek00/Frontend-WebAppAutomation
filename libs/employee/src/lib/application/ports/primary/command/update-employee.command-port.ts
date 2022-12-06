import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateEmployeeCommand } from './update-employee.command';

export const UPDATE_EMPLOYEE_COMMAND_PORT = new InjectionToken<UpdateEmployeeCommandPort>('UPDATE_EMPLOYEE_COMMAND_PORT');

export interface UpdateEmployeeCommandPort {
  update(command: UpdateEmployeeCommand): Observable<void>;
}
