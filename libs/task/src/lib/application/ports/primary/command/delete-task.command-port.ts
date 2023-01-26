import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import {DeleteCommand} from "./delete.command";

export const DELETE_TASK_COMMAND_PORT = new InjectionToken<DeleteTaskCommandPort>('DELETE_TASK_COMMAND_PORT');

export interface DeleteTaskCommandPort {
  deleteTask(command: DeleteCommand): Observable<void>;
}
