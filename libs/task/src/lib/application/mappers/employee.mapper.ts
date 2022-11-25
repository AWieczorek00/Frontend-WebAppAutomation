import { EmployeeListQuery } from '../ports/primary/query/employee/employee-list.query';
import { EmployeeQuery } from '../ports/primary/query/employee/employee.query';
import {TaskContext} from "../ports/secondary/context/task/task.context";
import {EmployeeContext} from "../ports/secondary/context/employee/employee.context";

export const mapFromEmployeeContext = (
  context: EmployeeContext
): EmployeeListQuery =>
  new EmployeeListQuery(
    context.employeeList.map(
      (employee) =>
        new EmployeeQuery(
          employee.individualId,
          employee.firstName,
          employee.secondName,
          employee.lastName
        )
    )
  );
