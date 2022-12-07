import {EmployeeContext} from "./ports/secondary/context/employee/employee.context";
import {EmployeeListQuery} from "./ports/primary/query/employee/employee-list.query";
import {EmployeeQuery} from "./ports/primary/query/employee/employee.query";

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
          employee.lastName,
          employee.phoneNumber,
          employee.email
        )
    )
  );
