import {EmployeeDto} from "../employee/employee.dto";
import {ClientDto} from "../client/client.dto";
import {ActivitiesDto} from "../activities/activities.dto";
import {PartDto} from "../part/part.dto";
import {ClientQuery} from "../../../primary/query/client.query";
import {EmployeeQuery} from "../../../primary/query/employee.query";
import {PartQuery} from "../../../primary/query/part/partQuery";

export interface OrderDto {
  readonly id:number
  readonly client:ClientDto
  readonly employeeList:EmployeeDto[]
  readonly activitiesList:ActivitiesDto[]
  readonly partList:PartDto[]
  readonly dateOfAdmission:Date
  readonly dateOfExecution:Date
  readonly priority:string
  readonly status:string
  readonly period:string
  readonly note:string



}
