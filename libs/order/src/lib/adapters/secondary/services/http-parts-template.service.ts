import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetAllPartsTemplateDtoPort } from '../../../application/ports/secondary/dto/parts-template/get-all-parts-template.dto-port';
import { PartsTemplateDto } from '../../../application/ports/secondary/dto/parts-template/parts-template.dto';

@Injectable()
export class HttpPartsTemplateService implements GetAllPartsTemplateDtoPort {
  constructor(private _httpClient: HttpClient) {
  }

  getAll(): Observable<PartsTemplateDto[]> {
    return this._httpClient.get<PartsTemplateDto[]>("http://localhost:8080/partsTemplate/all");
  }
}
