import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import {TaskContext} from "./task.context";

export const PATCH_TASK_CONTEXT_PORT = new InjectionToken<PatchTaskContextPort>('PATCH_TASK_CONTEXT_PORT');

export interface PatchTaskContextPort {
  patch(patch:Partial<TaskContext>): Observable<void>;
}
