import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivitiesTemplateDto } from './activities-template.dto';

export const ADD_ACTIVITIES_TEMPLATE_DTO_PORT =
  new InjectionToken<AddActivitiesTemplateDtoPort>(
    'ADD_ACTIVITIES_TEMPLATE_DTO_PORT'
  );

export interface AddActivitiesTemplateDtoPort {
  add(
    activitiesTemplate: Omit<Partial<ActivitiesTemplateDto>, 'id'>
  ): Observable<void>;
}
