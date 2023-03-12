import { EmployeeDto } from "../employee/employee.dto";

export interface RegisterDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly employee:EmployeeDto;
}
