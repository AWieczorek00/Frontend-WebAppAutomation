import { InjectionToken } from '@angular/core';
import { ActivitiesDto } from "../activities/activities.dto";
import { Observable } from "rxjs";

export const ADD_ACTIVITIES_TEMPLATE_DTO_PORT = new InjectionToken<AddActivitiesTemplateDtoPort>('ADD_ACTIVITIES_TEMPLATE_DTO_PORT');

export interface AddActivitiesTemplateDtoPort {

  add(activitiesTemplate:Omit<Partial<ActivitiesDto>,'id'>):Observable<void>
}
