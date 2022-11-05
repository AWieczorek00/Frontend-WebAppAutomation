import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const LOAD_CLIENTS_COMMAND_PORT = new InjectionToken<LoadClientsCommandPort>('LOAD_CLIENTS_COMMAND_PORT');

export interface LoadClientsCommandPort {
  loadClient(): Observable<void>;
}
