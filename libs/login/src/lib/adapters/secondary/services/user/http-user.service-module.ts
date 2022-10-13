import { NgModule } from '@angular/core';
import { HttpUserService } from './http-user.service';
import { ADDS_USER_DTO } from '../../../../application/ports/secondary/dto/adds-user.dto-port';

@NgModule({ imports: [],
  	declarations: [],
  	providers: [HttpUserService, { provide: ADDS_USER_DTO, useExisting: HttpUserService }],
  	exports: [] })
export class HttpUserServiceModule {
}
