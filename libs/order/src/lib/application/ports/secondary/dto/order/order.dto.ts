import { EmployeeDto } from '../employee/employee.dto';
import { ClientDto } from '../client/client.dto';
import { ActivitiesDto } from '../activities/activities.dto';
import { PartDto } from '../part/part.dto';

export interface OrderDto {
  readonly id: number;
  readonly client: ClientDto;
  readonly employeeList: EmployeeDto[];
  readonly activitiesList: ActivitiesDto[];
  readonly partList: PartDto[];
  readonly dateOfAdmission: Date;
  readonly dateOfExecution: Date;
  readonly manHour: number;
  readonly distance: number;
  readonly priority: string;
  readonly status: string;
  readonly period: string;
  readonly note: string;
}
