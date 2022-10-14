import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddsUserDtoPort } from '../../../../../application/ports/secondary/dto/adds-user.dto-port';
import { UserDTO } from '../../../../../application/ports/secondary/dto/user.dto';

@Injectable()
export class HttpUserService implements AddsUserDtoPort {
  constructor(private _client: HttpClient) {
  }

  add(userDTO: Partial<UserDTO>): Observable<void> {
    return this._client.post<UserDTO>('http://localhost:8080/api/login', userDTO).pipe(map((res:any) => {
      return res
    }));
  }

}
