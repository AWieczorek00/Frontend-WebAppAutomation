import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadClientsCommand } from '../client/load-clients.command';

export const LOAD_PARTS_ACTIVITIES_COMMAND_PORT = new InjectionToken<LoadPartsTemplateCommandPort>('LOAD_PARTS_ACTIVITIES_COMMAND_PORT');

export interface LoadPartsTemplateCommandPort {
  loadPartsTemplate(): Observable<void>;
}
