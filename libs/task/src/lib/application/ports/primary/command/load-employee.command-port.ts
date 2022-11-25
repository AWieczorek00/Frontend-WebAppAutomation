import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const LOAD_EMPLOYEE_COMMAND_PORT = new InjectionToken<LoadEmployeeCommandPort>('LOAD_EMPLOYEE_COMMAND_PORT');

export interface LoadEmployeeCommandPort {
  loadEmployee(): Observable<void>;
}
