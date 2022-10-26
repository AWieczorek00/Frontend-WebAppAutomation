import { InjectionToken } from '@angular/core';
import {Observable} from "rxjs";
import {OrderDto} from "./order.dto";

export const GET_ALL_DTO_PORT = new InjectionToken<GetAllDtoPort>('GET_ALL_DTO_PORT');

export interface GetAllDtoPort {
  getAll():Observable<OrderDto[]>
}
