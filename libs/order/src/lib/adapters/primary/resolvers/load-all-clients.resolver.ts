import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import {
  LOAD_CLIENTS_COMMAND_PORT,
  LoadClientsCommandPort,
} from '../../../application/ports/primary/command/client/load-clients.command-port';

@Injectable()
export class LoadAllClientsResolver implements Resolve<void> {
  constructor(
    @Inject(LOAD_CLIENTS_COMMAND_PORT)
    private _loadClientsCommandPort: LoadClientsCommandPort
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<void> {
    return this._loadClientsCommandPort.loadClient();
  }
}
