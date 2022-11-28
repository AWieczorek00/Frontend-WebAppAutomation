import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetAllPartsTemplateDtoPort } from '../../../application/ports/secondary/dto/parts-template/get-all-parts-template.dto-port';
import { AddActivitiesTemplateDtoPort } from '../../../application/ports/secondary/dto/activitiesTemplate/add-activities-template.dto-port';
import { PartsTemplateDto } from '../../../application/ports/secondary/dto/parts-template/parts-template.dto';
import { ActivitiesDto } from '../../../application/ports/secondary/dto/activities/activities.dto';

@Injectable()
export class HttpPartsTemplateService implements GetAllPartsTemplateDtoPort, AddActivitiesTemplateDtoPort {
  constructor(private _httpClient: HttpClient) {
  }

  getAll(): Observable<PartsTemplateDto[]> {
    return this._httpClient.get<PartsTemplateDto[]>("http://localhost:8080/partsTemplate/all");
  }

  add(activitiesTemplate: Omit<Partial<ActivitiesDto>, 'id'>): Observable<void> {
    return this._httpClient.post<void>('',activitiesTemplate)
  }
}
