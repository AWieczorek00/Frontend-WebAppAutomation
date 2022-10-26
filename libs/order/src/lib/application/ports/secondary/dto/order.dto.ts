import {EmployeeDto} from "./employee.dto";
import {ClientDto} from "./client.dto";
import {ActivitiesDto} from "./activities.dto";

export interface OrderDto {
  readonly id:number
  readonly employeeList:EmployeeDto[]
  readonly client:ClientDto
  readonly activitiesList:ActivitiesDto[]
  readonly dateOfAdmission:Date
  readonly dateOfExecution:Date
  readonly priority:string
  readonly status:string
  readonly period:string
  readonly note:string

}
