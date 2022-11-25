import {TaskDto} from "../../dto/task/task.dto";
import {EmployeeDto} from "../../dto/employee/employee.dto";

export interface TaskContext {
  readonly taskList:TaskDto[];
}
