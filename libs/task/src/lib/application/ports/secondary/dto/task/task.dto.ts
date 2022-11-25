import {EmployeeDto} from "../employee/employee.dto";

export interface TaskDto {
  readonly id: number;
  readonly name:string;
  readonly executionTime:Date;
  readonly employee:EmployeeDto;

}
