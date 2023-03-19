import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddsUserDtoPort } from '../../../../../application/ports/secondary/dto/adds-user.dto-port';
import { UserDTO } from '../../../../../application/ports/secondary/dto/user.dto';
// import { environment } from "../../../../../../../../environments/environment";
import * as myGlobals from 'global';


@Injectable()
export class HttpUserService implements AddsUserDtoPort {
  constructor(private _client: HttpClient) {
  }
  private url = myGlobals.apiUrl;

  add(userDTO: Partial<UserDTO>): Observable<void> {
    return this._client.post<UserDTO>(this.url+'auth/signin', userDTO).pipe(map((res:any) => {
      return res
    }));
  }

}
