import { EmployeeQuery } from "../query/employee/employee.query";

export class RegisterUserCommand {
  constructor(
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
    public readonly employee: EmployeeQuery
  ) {}
}
