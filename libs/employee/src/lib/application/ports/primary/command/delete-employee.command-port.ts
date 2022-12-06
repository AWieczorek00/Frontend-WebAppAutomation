import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const DELETE_EMPLOYEE_COMMAND_PORT = new InjectionToken<DeleteEmployeeCommandPort>('DELETE_EMPLOYEE_COMMAND_PORT');

export interface DeleteEmployeeCommandPort {
  delete(individualId: number): Observable<void>;
}
