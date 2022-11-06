import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const LOAD_EMPLOYEE_COMMAND_PORT = new InjectionToken<LoadEmployeesCommandPort>('LOAD_EMPLOYEE_COMMAND_PORT');

export interface LoadEmployeesCommandPort {
  loadEmployees(): Observable<void>;
}
