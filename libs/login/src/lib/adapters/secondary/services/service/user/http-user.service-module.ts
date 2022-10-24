import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpUserService } from './http-user.service';
import { ADDS_USER_DTO } from '../../../../../application/ports/secondary/dto/adds-user.dto-port';

@NgModule({ imports: [HttpClientModule],
  	declarations: [],
  	providers: [HttpUserService, { provide: ADDS_USER_DTO, useExisting: HttpUserService }],
  	exports: [] })
export class HttpUserServiceModule {
}
