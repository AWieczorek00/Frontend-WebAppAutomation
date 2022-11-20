import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const DELETE_ORDER_DTO_PORT = new InjectionToken<DeleteOrderDtoPort>('DELETE_ORDER_DTO_PORT');

export interface DeleteOrderDtoPort {
  delete(id: number): Observable<void>;
}
