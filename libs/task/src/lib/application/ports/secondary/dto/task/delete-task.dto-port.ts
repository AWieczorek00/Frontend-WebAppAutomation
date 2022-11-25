import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const DELETE_TASK_DTO_PORT = new InjectionToken<DeleteTaskDtoPort>('DELETE_TASK_DTO_PORT');

export interface DeleteTaskDtoPort {
  delete(id: number): Observable<void>;
}
