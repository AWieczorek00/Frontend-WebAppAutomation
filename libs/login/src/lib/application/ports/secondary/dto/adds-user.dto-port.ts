import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from './user.dto';

export const ADDS_USER_DTO = new InjectionToken<AddsUserDtoPort>('ADDS_USER_DTO');

export interface AddsUserDtoPort {
  add(userDTO: Partial<UserDTO>): Observable<void>;
}
