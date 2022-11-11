export class ClientQuery {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public  readonly nip: string,
    public readonly address: string,
    public readonly city: string,
    public readonly zipcode: string,
    public readonly streetNumber: string,
    public readonly apartmentNumber: string,
    public readonly phoneNumber: string,
    public readonly email: string,
    public readonly type: string
  ) {}
}
