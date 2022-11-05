import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientListQuery } from './client-list.query';

export const GETS_CURRENT_CLIENT_LIST_QUERY_PORT = new InjectionToken<GetsCurrentClientListQueryPort>('GETS_CURRENT_CLIENT_LIST_QUERY_PORT');

export interface GetsCurrentClientListQueryPort {
  getCurrentClientList(): Observable<ClientListQuery>;
}
