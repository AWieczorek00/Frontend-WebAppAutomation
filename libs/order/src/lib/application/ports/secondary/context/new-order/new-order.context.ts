import { ClientDto } from '../../dto/client/client.dto';
import { EmployeeDto } from '../../dto/employee/employee.dto';
import { ActivitiesTemplateDto } from '../../dto/activitiesTemplate/activities-template.dto';

export interface NewOrderContext {
  readonly clientList: ClientDto[];
  readonly employeeList: EmployeeDto[];
  readonly activitiesTemplateList: ActivitiesTemplateDto[];
}
