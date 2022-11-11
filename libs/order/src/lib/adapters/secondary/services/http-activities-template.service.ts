import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetAllActivitiesTemplateDtoPort } from '../../../application/ports/secondary/dto/activitiesTemplate/get-all-activities-template.dto-port';
import { ActivitiesTemplateDto } from '../../../application/ports/secondary/dto/activitiesTemplate/activities-template.dto';

@Injectable()
export class HttpActivitiesTemplateService implements GetAllActivitiesTemplateDtoPort {
  constructor(private _httpClient: HttpClient) {
  }

  getAll(): Observable<ActivitiesTemplateDto[]> {
    return this._httpClient.get<ActivitiesTemplateDto[]>('http://localhost:8080/activitiesTemplate/all');
  }
}
