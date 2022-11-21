export class PartsQuery {
  constructor(
    public readonly id:number,
    public readonly name: string,
    public readonly price: number,
    public readonly amount: number
  ) {}
}
