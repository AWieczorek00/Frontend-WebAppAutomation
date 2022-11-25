import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeDto } from './employee.dto';
import { TaskDto } from '../task/task.dto';

export const GET_ALL_TASK_BY_EMPLOYEE_DTO_PORT = new InjectionToken<GetAllTaskByEmployeeDtoPort>('GET_ALL_TASK_BY_EMPLOYEE_DTO_PORT');

export interface GetAllTaskByEmployeeDtoPort {
  getAllTaskByEmployee(employee: EmployeeDto): Observable<TaskDto[]>;
}
