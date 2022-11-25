import { NgModule } from '@angular/core';
import { HttpEmployeeService } from './http-employee.service';
import { GET_ALL_EMPLOYEE_DTO_PORT } from '../../../application/ports/secondary/dto/employee/get-all-employee.dto-port';

@NgModule({
  imports: [],
  declarations: [],
  providers: [HttpEmployeeService, { provide: GET_ALL_EMPLOYEE_DTO_PORT, useExisting: HttpEmployeeService }],
  exports: []
})
export class HttpEmployeeServiceModule {
}
