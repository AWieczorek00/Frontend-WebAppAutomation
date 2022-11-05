export class ClientQuery {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly nip: string,
    public readonly address: string,
    public readonly city: string,
    public readonly numberPhone: string,
    public readonly email: string,
    public readonly type: string
  ) {}
}
