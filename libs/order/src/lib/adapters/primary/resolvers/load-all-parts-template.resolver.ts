import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LOAD_PARTS_ACTIVITIES_COMMAND_PORT, LoadPartsTemplateCommandPort } from '../../../application/ports/primary/command/partsTemplate/load-parts-template.command-port';

@Injectable()
export class LoadAllPartsTemplateResolver implements Resolve<void> {
  constructor(@Inject(LOAD_PARTS_ACTIVITIES_COMMAND_PORT) private _loadPartsTemplateCommandPort: LoadPartsTemplateCommandPort) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<void> {
    return this._loadPartsTemplateCommandPort.loadPartsTemplate();

  }
}
