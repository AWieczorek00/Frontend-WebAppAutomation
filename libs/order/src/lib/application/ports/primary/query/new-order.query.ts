import { ClientQuery } from './client.query';
import { EmployeeQuery } from './employee.query';
import {ActivitiesTemplateQuery} from "./activities-template/activities-template.query";
import {PartsTemplateQuery} from "./parts-template/parts-template.query";

export class NewOrderQuery {
  constructor(
    public readonly clientList: ClientQuery[],
    public readonly employeeList: EmployeeQuery[],
    public readonly activitiesTemplateList: ActivitiesTemplateQuery[],
    public readonly partsTemplateList: PartsTemplateQuery[]
  ) {}
}
