import { EmployeeQuery } from '../query/employee/employee.query';

export class AddTaskCommand {
  constructor(
    readonly name: string,
    readonly executionTime: Date,
    readonly done:boolean,
    readonly employee: EmployeeQuery
  ) {}
}
