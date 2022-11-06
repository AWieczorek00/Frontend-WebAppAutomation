import {ClientDto} from "../../dto/client/client.dto";
import {EmployeeDto} from "../../dto/employee/employee.dto";

export interface NewOrderContext {
  readonly  clientList:ClientDto[]
  readonly employeeList:EmployeeDto[]
}
