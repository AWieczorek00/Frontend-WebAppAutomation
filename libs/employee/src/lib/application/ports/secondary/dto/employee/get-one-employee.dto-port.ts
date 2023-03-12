import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeDto } from './employee.dto';

export const GET_ONE_EMPLOYEE_DTO_PORT = new InjectionToken<GetOneEmployeeDtoPort>('GET_ONE_EMPLOYEE_DTO_PORT');

export interface GetOneEmployeeDtoPort {
  getOne(individualId: number): Observable<EmployeeDto>;
}
