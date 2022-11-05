import { NgModule } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { GET_ALL_CLIENT_DTO_PORT } from '../../../application/ports/secondary/dto/client/get-all-client.dto-port';

@NgModule({
  imports: [],
  declarations: [],
  providers: [HttpClientService, { provide: GET_ALL_CLIENT_DTO_PORT, useExisting: HttpClientService }],
  exports: []
})
export class HttpClientServiceModule {
}
