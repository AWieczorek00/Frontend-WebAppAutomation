import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoadOrdersCommand } from '../../../application/ports/primary/command/load-orders.command';
import {
  LOAD_ORDER_COMMAND_PORT,
  LoadOrdersCommandPort,
} from '../../../application/ports/primary/command/load-orders.command-port';

@Injectable()
export class LoadOrdersResolver implements Resolve<void> {
  constructor(
    @Inject(LOAD_ORDER_COMMAND_PORT)
    private _loadOrdersCommandPort: LoadOrdersCommandPort
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<void> {
    return this._loadOrdersCommandPort.loadOrder(new  LoadOrdersCommand());
  }
}
