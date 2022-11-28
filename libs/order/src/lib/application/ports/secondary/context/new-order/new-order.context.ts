import { ClientDto } from '../../dto/client/client.dto';
import { EmployeeDto } from '../../dto/employee/employee.dto';
import { ActivitiesTemplateDto } from '../../dto/activitiesTemplate/activities-template.dto';
import {PartsTemplateDto} from "../../dto/parts-template/parts-template.dto";

export interface NewOrderContext {
  readonly clientList: ClientDto[];
  readonly employeeList: EmployeeDto[];
  readonly activitiesTemplateList: ActivitiesTemplateDto[];
  readonly partsTemplateList:PartsTemplateDto[];
}
