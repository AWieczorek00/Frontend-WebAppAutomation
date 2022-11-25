import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LOAD_EMPLOYEE_COMMAND_PORT, LoadEmployeeCommandPort } from '../../../application/ports/primary/command/load-employee.command-port';

@Injectable()
export class LoadEmployeeResolver implements Resolve<void> {
  constructor(@Inject(LOAD_EMPLOYEE_COMMAND_PORT) private _loadEmployeeCommandPort: LoadEmployeeCommandPort) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void> {


    return this._loadEmployeeCommandPort.loadEmployee();
  }
}
