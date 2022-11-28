import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetAllActivitiesTemplateDtoPort } from '../../../application/ports/secondary/dto/activitiesTemplate/get-all-activities-template.dto-port';
import { AddActivitiesTemplateDtoPort } from '../../../application/ports/secondary/dto/activitiesTemplate/add-activities-template.dto-port';
import { ActivitiesTemplateDto } from '../../../application/ports/secondary/dto/activitiesTemplate/activities-template.dto';

@Injectable()
export class HttpActivitiesTemplateService
  implements GetAllActivitiesTemplateDtoPort, AddActivitiesTemplateDtoPort
{
  constructor(private _httpClient: HttpClient) {}

  private url = 'http://localhost:8080/';

  getAll(): Observable<ActivitiesTemplateDto[]> {
    console.log(this.url + 'activitiesTemplate/add');
    return this._httpClient.get<ActivitiesTemplateDto[]>(
      this.url + 'activitiesTemplate/all'
    );
  }

  add(
    activitiesTemplate: Omit<Partial<ActivitiesTemplateDto>, 'id'>
  ): Observable<void> {
    console.log(this.url + 'activitiesTemplate/add');
    return this._httpClient.post<void>(
      this.url + 'activitiesTemplate/add',
      activitiesTemplate
    );
  }
}
