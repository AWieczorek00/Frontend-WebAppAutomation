import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterUserCommand } from './register-user.command';

export const REGISTER_USER_COMMAND_PORT = new InjectionToken<RegisterUserCommandPort>('REGISTER_USER_COMMAND_PORT');

export interface RegisterUserCommandPort {
  register(registerUser: RegisterUserCommand): Observable<void>;
}
