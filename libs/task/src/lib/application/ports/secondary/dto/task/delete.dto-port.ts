import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const DELETE_DTO_PORT = new InjectionToken<DeleteDtoPort>('DELETE_DTO_PORT');

export interface DeleteDtoPort {
  delete(id: number): Observable<void>;
}
