import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeDto } from './employee.dto';

export const GET_ALL_EMPLOYEE_DTO_PORT = new InjectionToken<GetAllEmployeeDtoPort>('GET_ALL_EMPLOYEE_DTO_PORT');

export interface GetAllEmployeeDtoPort {
  getAll(): Observable<EmployeeDto[]>;
}
