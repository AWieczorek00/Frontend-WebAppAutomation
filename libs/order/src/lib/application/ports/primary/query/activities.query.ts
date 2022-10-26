export class ActivitiesQuery {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly attention: string,
    public readonly done: boolean
  ) {}
}
