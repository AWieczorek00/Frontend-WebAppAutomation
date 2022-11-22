import { EmployeeQuery } from '../../query/employee.query';
import { ClientQuery } from '../../query/client.query';
import { ActivitiesDto } from '../../../secondary/dto/activities/activities.dto';
import {PartQuery} from "../../query/part/partQuery";

export class CreateOrderCommand {
  constructor(
    public readonly client: ClientQuery,
    public readonly employeeList: EmployeeQuery[],
    public readonly activitiesList: ActivitiesDto[],
    public readonly partList:PartQuery[],
    public readonly dateOfAdmission: Date,
    public readonly dateOfExecution: Date,
    public readonly priority: string,
    public readonly status: string,
    public readonly period: string,
    public readonly note: string

  ) {}
}
