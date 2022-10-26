import { ActivitiesDto } from '../../secondary/dto/activities.dto';
import { EmployeeQuery } from './employee.query';
import { ClientQuery } from './client.query';
import {ActivitiesQuery} from "./activities.query";

export class OrderQuery {
  constructor(
    public readonly id: number,
    public readonly employees: EmployeeQuery[],
    public readonly client: ClientQuery,
    public readonly activities: ActivitiesDto[],
    public readonly dateOfAdmission: Date,
    public readonly dateOfExecution: Date,
    public readonly priority: string,
    public readonly status: string,
    public readonly period: string,
    public readonly note: string
  ) {}
}
