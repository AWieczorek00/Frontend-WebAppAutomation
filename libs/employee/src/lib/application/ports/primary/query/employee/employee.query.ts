export class EmployeeQuery {
  constructor(
    public readonly individualId: number,
    public readonly firstName: string,
    public readonly secondName: string,
    public readonly lastName: string,
    public readonly phoneNumber:number
  ) {}
}
