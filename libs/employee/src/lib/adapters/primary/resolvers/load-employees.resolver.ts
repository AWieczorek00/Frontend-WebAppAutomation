import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LOAD_EMPLOYEES_COMMAND_PORT, LoadEmployeesCommandPort } from '../../../application/ports/primary/command/load-employees.command-port';

@Injectable()
export class LoadEmployeesResolver implements Resolve<void> {
  constructor(@Inject(LOAD_EMPLOYEES_COMMAND_PORT) private _loadEmployeesCommandPort: LoadEmployeesCommandPort) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void> {
    return this._loadEmployeesCommandPort.load();

  }
}
