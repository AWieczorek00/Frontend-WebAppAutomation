import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientDto } from './client.dto';

export const GET_ALL_CLIENT_DTO_PORT = new InjectionToken<GetAllClientDtoPort>('GET_ALL_CLIENT_DTO_PORT');

export interface GetAllClientDtoPort {
  getAll(): Observable<ClientDto[]>;
}
