import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskDto } from './task.dto';

export const GET_ALL_TASK_DTO_PORT = new InjectionToken<GetAllTaskDtoPort>('GET_ALL_TASK_DTO_PORT');

export interface GetAllTaskDtoPort {
  getAll(): Observable<TaskDto[]>;
}
