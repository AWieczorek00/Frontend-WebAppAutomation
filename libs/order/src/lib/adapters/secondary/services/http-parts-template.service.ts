import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetAllPartsTemplateDtoPort } from '../../../application/ports/secondary/dto/parts-template/get-all-parts-template.dto-port';
import { AddActivitiesTemplateDtoPort } from '../../../application/ports/secondary/dto/activitiesTemplate/add-activities-template.dto-port';
import { PartsTemplateDto } from '../../../application/ports/secondary/dto/parts-template/parts-template.dto';

@Injectable()
export class HttpPartsTemplateService
  implements GetAllPartsTemplateDtoPort
{
  constructor(private _httpClient: HttpClient) {}
  private url = 'http://localhost:8080/';
  getAll(): Observable<PartsTemplateDto[]> {
    return this._httpClient.get<PartsTemplateDto[]>(
      this.url+'partsTemplate/all'
    );
  }
}
