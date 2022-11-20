import {EmployeeQuery} from '../query/employee.query';
import {ClientQuery} from '../query/client.query';
import {ActivitiesDto} from '../../secondary/dto/activities/activities.dto';

export class DuplicateOrderCommand {
  constructor(
    public readonly id: number,
  ) {
  }
}
