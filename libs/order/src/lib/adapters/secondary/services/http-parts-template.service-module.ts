import { NgModule } from '@angular/core';
import { HttpPartsTemplateService } from './http-parts-template.service';
import { GET_ALL_PARTS_TEMPLATE_DTO_PORT } from '../../../application/ports/secondary/dto/parts-template/get-all-parts-template.dto-port';
import { ADD_ACTIVITIES_TEMPLATE_DTO_PORT } from '../../../application/ports/secondary/dto/activitiesTemplate/add-activities-template.dto-port';

@NgModule({
  imports: [],
  declarations: [],
  providers: [HttpPartsTemplateService, { provide: GET_ALL_PARTS_TEMPLATE_DTO_PORT, useExisting: HttpPartsTemplateService }, { provide: ADD_ACTIVITIES_TEMPLATE_DTO_PORT, useExisting: HttpPartsTemplateService }],
  exports: []
})
export class HttpPartsTemplateServiceModule {
}
