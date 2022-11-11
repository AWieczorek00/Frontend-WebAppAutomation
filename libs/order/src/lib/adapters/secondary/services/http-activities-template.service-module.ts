import { NgModule } from '@angular/core';
import { HttpActivitiesTemplateService } from './http-activities-template.service';
import { GET_ALL_ACTIVITIES_TEMPLATE_DTO_PORT } from '../../../application/ports/secondary/dto/activitiesTemplate/get-all-activities-template.dto-port';

@NgModule({
  imports: [],
  declarations: [],
  providers: [HttpActivitiesTemplateService, { provide: GET_ALL_ACTIVITIES_TEMPLATE_DTO_PORT, useExisting: HttpActivitiesTemplateService }],
  exports: []
})
export class HttpActivitiesTemplateServiceModule {
}
