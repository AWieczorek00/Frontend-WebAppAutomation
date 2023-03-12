import { InjectionToken } from '@angular/core';
import { Observable } from "rxjs";
import { RegisterDto } from "./register.dto";

export const CREATE_NEW_USER_DTO_PORT = new InjectionToken<CreateNewUserDtoPort>('CREATE_NEW_USER_DTO_PORT');

export interface CreateNewUserDtoPort {
  create(employee: Omit<Partial<RegisterDto>,'id'>): Observable<void>;
}
