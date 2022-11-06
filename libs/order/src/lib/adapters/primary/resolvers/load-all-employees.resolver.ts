import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LOAD_EMPLOYEE_COMMAND_PORT, LoadEmployeesCommandPort } from '../../../application/ports/primary/command/employee/load-employees.command-port';

@Injectable()
export class LoadAllEmployeesResolver implements Resolve<void> {
  constructor(@Inject(LOAD_EMPLOYEE_COMMAND_PORT) private _loadEmployeesCommandPort: LoadEmployeesCommandPort) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void> {
    return this._loadEmployeesCommandPort.loadEmployees()
  }
}
