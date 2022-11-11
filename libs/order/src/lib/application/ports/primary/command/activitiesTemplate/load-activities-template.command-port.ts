import { InjectionToken } from '@angular/core';
import {Observable} from "rxjs";

export const LOAD_ACTIVITIES_TEMPLATE_COMMAND_PORT = new InjectionToken<LoadActivitiesTemplateCommandPort>('LOAD_ACTIVITIES_TEMPLATE_COMMAND_PORT');

export interface LoadActivitiesTemplateCommandPort {
  loadActivitiesTemplate():Observable<void>
}
