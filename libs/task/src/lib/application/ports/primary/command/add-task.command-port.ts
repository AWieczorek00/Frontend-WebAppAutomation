import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { AddTaskCommand } from './add-task.command';

export const ADD_TASK_COMMAND_PORT = new InjectionToken<AddTaskCommandPort>('ADD_TASK_COMMAND_PORT');

export interface AddTaskCommandPort {
  add(command: AddTaskCommand): Observable<void>;
}
