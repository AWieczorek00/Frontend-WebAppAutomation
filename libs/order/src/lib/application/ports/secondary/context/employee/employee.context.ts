import {EmployeeDto} from "../../dto/employee/employee.dto";

export interface EmployeeContext {
  readonly employeeList:EmployeeDto[]
}
