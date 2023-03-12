import { NgModule } from '@angular/core';
import { HttpEmployeeService } from './http-employee.service';
import { GET_ALL_EMPLOYEE_DTO_PORT } from '../../../application/ports/secondary/dto/employee/get-all-employee.dto-port';
import { ADD_EMPLOYEE_DTO_PORT } from '../../../application/ports/secondary/dto/employee/add-employee.dto-port';
import { DELETE_EMPLOYEE_DTO_PORT } from '../../../application/ports/secondary/dto/employee/delete-employee.dto-port';
import { UPDATE_EMPLOYEE_DTO_PORT } from '../../../application/ports/secondary/dto/employee/update-employee.dto-port';
import { GET_ONE_EMPLOYEE_DTO_PORT } from '../../../application/ports/secondary/dto/employee/get-one-employee.dto-port';
import { CREATE_NEW_USER_DTO_PORT } from '../../../application/ports/secondary/dto/register/create-new-user.dto-port';

@NgModule({
  imports: [],
  declarations: [],
  providers: [HttpEmployeeService, { provide: GET_ALL_EMPLOYEE_DTO_PORT, useExisting: HttpEmployeeService }, { provide: ADD_EMPLOYEE_DTO_PORT, useExisting: HttpEmployeeService }, { provide: DELETE_EMPLOYEE_DTO_PORT, useExisting: HttpEmployeeService }, { provide: UPDATE_EMPLOYEE_DTO_PORT, useExisting: HttpEmployeeService }, { provide: GET_ONE_EMPLOYEE_DTO_PORT, useExisting: HttpEmployeeService }, { provide: CREATE_NEW_USER_DTO_PORT, useExisting: HttpEmployeeService }],
  exports: []
})
export class HttpEmployeeServiceModule {
}
