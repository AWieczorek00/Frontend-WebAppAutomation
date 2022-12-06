import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import {EmployeeDto} from "./employee.dto";

export const ADD_EMPLOYEE_DTO_PORT = new InjectionToken<AddEmployeeDtoPort>('ADD_EMPLOYEE_DTO_PORT');

export interface AddEmployeeDtoPort {
  add(employee: Omit<Partial<EmployeeDto>,'individualId'>): Observable<void>;
}
