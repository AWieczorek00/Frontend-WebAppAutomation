import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const LOAD_TASK_COMMAND_PORT = new InjectionToken<LoadTaskCommandPort>('LOAD_TASK_COMMAND_PORT');

export interface LoadTaskCommandPort {
  loadTask(): Observable<void>;
}
