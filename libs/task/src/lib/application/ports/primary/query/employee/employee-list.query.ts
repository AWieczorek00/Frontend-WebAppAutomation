import { EmployeeQuery } from './employee.query';

export class EmployeeListQuery {
  constructor(readonly employeeList: EmployeeQuery[]) {}
}
