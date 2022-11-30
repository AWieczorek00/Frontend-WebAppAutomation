import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskDto } from './task.dto';

export const GET_ALL_TASK_BY_EMPLOYEE_DTO_PORT = new InjectionToken<GetAllTaskByEmployeeDtoPort>('GET_ALL_TASK_BY_EMPLOYEE_DTO_PORT');

export interface GetAllTaskByEmployeeDtoPort {
  getAllTaskByEmployee(individualId: number): Observable<TaskDto[]>;
}
