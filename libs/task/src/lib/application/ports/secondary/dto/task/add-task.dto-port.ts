import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskDto } from './task.dto';

export const ADD_TASK_DTO_PORT = new InjectionToken<AddTaskDtoPort>('ADD_TASK_DTO_PORT');

export interface AddTaskDtoPort {
  add(task: Partial<TaskDto>): Observable<void>;
}
