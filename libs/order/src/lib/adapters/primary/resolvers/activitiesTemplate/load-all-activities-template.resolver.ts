import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import {
  LOAD_ACTIVITIES_TEMPLATE_COMMAND_PORT,
  LoadActivitiesTemplateCommandPort,
} from '../../../../application/ports/primary/command/activitiesTemplate/load-activities-template.command-port';
import { Observable } from 'rxjs';

@Injectable()
export class LoadAllActivitiesTemplateResolver implements Resolve<void> {
  constructor(
    @Inject(LOAD_ACTIVITIES_TEMPLATE_COMMAND_PORT)
    private _loadActivitiesTemplateCommandPort: LoadActivitiesTemplateCommandPort
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<void> {
    return this._loadActivitiesTemplateCommandPort.loadActivitiesTemplate();
  }
}
