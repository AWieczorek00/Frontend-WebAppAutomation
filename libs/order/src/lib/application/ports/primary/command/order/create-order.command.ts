import { EmployeeQuery } from '../../query/employee.query';
import { ClientQuery } from '../../query/client.query';
import { ActivitiesDto } from '../../../secondary/dto/activities/activities.dto';

export class CreateOrderCommand {
  constructor(
    public readonly id: number,
    public readonly client: ClientQuery,
    public readonly employeeList: EmployeeQuery[],
    public readonly activitiesList: ActivitiesDto[],
    public readonly dateOfAdmission: Date,
    public readonly dateOfExecution: Date,
    public readonly priority: string,
    public readonly status: string,
    public readonly period: string,
    public readonly note: string
  ) {}
}
