import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const DELETE_EMPLOYEE_DTO_PORT = new InjectionToken<DeleteEmployeeDtoPort>('DELETE_EMPLOYEE_DTO_PORT');

export interface DeleteEmployeeDtoPort {
  delete(individualId: number): Observable<void>;

}
