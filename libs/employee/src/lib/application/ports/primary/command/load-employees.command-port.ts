import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const LOAD_EMPLOYEES_COMMAND_PORT = new InjectionToken<LoadEmployeesCommandPort>('LOAD_EMPLOYEES_COMMAND_PORT');

export interface LoadEmployeesCommandPort {
  load(): Observable<void>;
}
