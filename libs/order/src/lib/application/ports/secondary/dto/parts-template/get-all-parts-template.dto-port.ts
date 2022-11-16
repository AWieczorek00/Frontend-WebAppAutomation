import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { PartsTemplateDto } from './parts-template.dto';

export const GET_ALL_PARTS_TEMPLATE_DTO_PORT = new InjectionToken<GetAllPartsTemplateDtoPort>('GET_ALL_PARTS_TEMPLATE_DTO_PORT');

export interface GetAllPartsTemplateDtoPort {
  getAll(): Observable<PartsTemplateDto[]>;
}
