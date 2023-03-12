import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import {EmployeeDto} from "./employee.dto";

export const UPDATE_EMPLOYEE_DTO_PORT = new InjectionToken<UpdateEmployeeDtoPort>('UPDATE_EMPLOYEE_DTO_PORT');

export interface UpdateEmployeeDtoPort {
  update(employee:Partial<EmployeeDto>): Observable<void>;
}
