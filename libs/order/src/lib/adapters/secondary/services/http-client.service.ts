import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetAllClientDtoPort } from '../../../application/ports/secondary/dto/client/get-all-client.dto-port';
import { ClientDto } from '../../../application/ports/secondary/dto/client/client.dto';
import * as myGlobals from 'global';

@Injectable()
export class HttpClientService implements GetAllClientDtoPort {
  constructor(private _httpClient: HttpClient) {
  }
  private url = myGlobals.apiUrl;

  getAll(): Observable<ClientDto[]> {
    return this._httpClient.get<ClientDto[]>(this.url+'client/all');
  }
}
