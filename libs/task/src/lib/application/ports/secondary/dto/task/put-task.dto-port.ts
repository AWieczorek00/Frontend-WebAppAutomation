import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskDto } from './task.dto';

export const PUT_TASK_DTO_PORT = new InjectionToken<PutTaskDtoPort>('PUT_TASK_DTO_PORT');

export interface PutTaskDtoPort {
  updateTask(task: Partial<TaskDto>): Observable<void>;
}
