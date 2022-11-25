import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LOAD_TASK_COMMAND_PORT, LoadTaskCommandPort } from '../../../application/ports/primary/command/load-task.command-port';

@Injectable()
export class LoadTaskResolver implements Resolve<void> {
  constructor(@Inject(LOAD_TASK_COMMAND_PORT) private _loadTaskCommandPort: LoadTaskCommandPort) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void> {
    return this._loadTaskCommandPort.loadTask();

  }
}
