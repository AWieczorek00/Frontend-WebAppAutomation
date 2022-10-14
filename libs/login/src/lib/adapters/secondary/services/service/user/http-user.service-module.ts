import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpUserService } from './http-user.service';
import { ADDS_USER_DTO } from '../../../../../application/ports/secondary/dto/adds-user.dto-port';
import { GETALL_DTO_PORT } from '../../../../../application/ports/secondary/dto/getall.dto-port';

@NgModule({ imports: [HttpClientModule],
  	declarations: [],
  	providers: [HttpUserService, { provide: ADDS_USER_DTO, useExisting: HttpUserService }, { provide: GETALL_DTO_PORT, useExisting: HttpUserService }],
  	exports: [] })
export class HttpUserServiceModule {
}
