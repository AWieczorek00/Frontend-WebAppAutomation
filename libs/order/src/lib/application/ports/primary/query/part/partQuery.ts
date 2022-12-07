export class PartQuery {
  constructor(
    public readonly id:number,
    public readonly name: string,
    public readonly price: number,
    public readonly tax: number,
    public readonly amount: number
  ) {}
}
