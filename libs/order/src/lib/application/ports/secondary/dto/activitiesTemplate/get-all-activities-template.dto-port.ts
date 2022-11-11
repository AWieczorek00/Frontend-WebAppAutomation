import { InjectionToken } from '@angular/core';
import {Observable} from "rxjs";
import {ActivitiesTemplateDto} from "./activities-template.dto";

export const GET_ALL_ACTIVITIES_TEMPLATE_DTO_PORT = new InjectionToken<GetAllActivitiesTemplateDtoPort>('GET_ALL_ACTIVITIES_TEMPLATE_DTO_PORT');

export interface GetAllActivitiesTemplateDtoPort {
  getAll():Observable<ActivitiesTemplateDto[]>
}
