export class AddEmployeeCommand {
  constructor(
    public readonly firstName: string,
    public readonly secondName: string,
    public readonly lastName: string,
    public readonly phoneNumber: number,
    public readonly email: string,
    public readonly login: string,
    public readonly password: string
  ) {}
}
