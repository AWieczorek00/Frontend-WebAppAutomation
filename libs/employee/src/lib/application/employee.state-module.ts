import { NgModule } from '@angular/core';
import { EmployeeState } from './employee.state';
import { LOAD_EMPLOYEES_COMMAND_PORT } from './ports/primary/command/load-employees.command-port';
import { GET_CURRENCY_EMPLOYEE_LIST_QUERY_PORT } from './ports/primary/query/employee/get-currency-employee-list.query-port';
import { ADD_EMPLOYEE_COMMAND_PORT } from './ports/primary/command/add-employee.command-port';
import { DELETE_EMPLOYEE_COMMAND_PORT } from './ports/primary/command/delete-employee.command-port';
import { UPDATE_EMPLOYEE_COMMAND_PORT } from './ports/primary/command/update-employee.command-port';
import { REGISTER_USER_COMMAND_PORT } from './ports/primary/command/register-user.command-port';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    EmployeeState,
    { provide: LOAD_EMPLOYEES_COMMAND_PORT, useExisting: EmployeeState },
    { provide: GET_CURRENCY_EMPLOYEE_LIST_QUERY_PORT, useExisting: EmployeeState },
    { provide: ADD_EMPLOYEE_COMMAND_PORT, useExisting: EmployeeState },
    { provide: DELETE_EMPLOYEE_COMMAND_PORT, useExisting: EmployeeState },
    { provide: UPDATE_EMPLOYEE_COMMAND_PORT, useExisting: EmployeeState },
    { provide: REGISTER_USER_COMMAND_PORT, useExisting: EmployeeState }
  ],
  exports: [],
})
export class EmployeeStateModule { }
