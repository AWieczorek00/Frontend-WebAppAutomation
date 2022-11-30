import {EmployeeQuery} from "../query/employee/employee.query";

export class DoneTaskCommand {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly done: boolean,
    public readonly executionTime: Date,
    public readonly employee:EmployeeQuery
  ) {}
}
