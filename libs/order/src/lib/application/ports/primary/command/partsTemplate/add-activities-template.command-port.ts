import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { AddActivitiesTemplateCommand } from './add-activities-template.command';

export const ADD_ACTIVITIES_TEMPLATE_COMMAND_PORT = new InjectionToken<AddActivitiesTemplateCommandPort>('ADD_ACTIVITIES_TEMPLATE_COMMAND_PORT');

export interface AddActivitiesTemplateCommandPort {
  add(command: AddActivitiesTemplateCommand): Observable<void>;
}
