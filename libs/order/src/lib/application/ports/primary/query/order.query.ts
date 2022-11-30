import { ActivitiesDto } from '../../secondary/dto/activities/activities.dto';
import { EmployeeQuery } from './employee.query';
import { ClientQuery } from './client.query';
import {PartQuery} from "./part/partQuery";

export class OrderQuery {
  constructor(
    public readonly id: number,
    public readonly client: ClientQuery,
    public readonly employeeList: EmployeeQuery[],
    public readonly activitiesList: ActivitiesDto[],
    public readonly partList: PartQuery[],
    public readonly dateOfAdmission: Date,
    public readonly dateOfExecution: Date,
    public readonly manHour: number,
    public readonly distance: number,
    public readonly priority: string,
    public readonly status: string,
    public readonly period: string,
    public readonly note: string
  ) {}
}
