import { ClientQuery } from './client.query';
import { EmployeeQuery } from './employee.query';

export class NewOrderQuery {
  constructor(
    public readonly clientList: ClientQuery[],
    public readonly employeeList: EmployeeQuery[]
  ) {}
}
