import { EmployeeQuery } from '../employee/employee.query';

export class TaskQuery {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly done: boolean,
    readonly executionTime: Date,
    readonly employee: EmployeeQuery
  ) {}
}
