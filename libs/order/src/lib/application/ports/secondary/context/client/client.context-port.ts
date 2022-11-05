import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientContext } from './client.context';

export const CLIENT_CONTEXT_PORT = new InjectionToken<ClientContextPort>(
  'CLIENT_CONTEXT_PORT'
);

export interface ClientContextPort {
  select(): Observable<ClientContext>;
  setState(context: ClientContext): Observable<void>;
}
