import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { LoadEmployeesCommandPort } from './ports/primary/command/load-employees.command-port';
import { GetCurrencyEmployeeListQueryPort } from './ports/primary/query/employee/get-currency-employee-list.query-port';
import { AddEmployeeCommandPort } from './ports/primary/command/add-employee.command-port';
import { DeleteEmployeeCommandPort } from './ports/primary/command/delete-employee.command-port';
import { UpdateEmployeeCommandPort } from './ports/primary/command/update-employee.command-port';
import { RegisterUserCommandPort } from './ports/primary/command/register-user.command-port';
import {
  GET_ALL_EMPLOYEE_DTO_PORT,
  GetAllEmployeeDtoPort,
} from './ports/secondary/dto/employee/get-all-employee.dto-port';
import {
  EMPLOYEE_CONTEXT_PORT,
  EmployeeContextPort,
} from './ports/secondary/context/employee/employee.context-port';
import {
  ADD_EMPLOYEE_DTO_PORT,
  AddEmployeeDtoPort,
} from './ports/secondary/dto/employee/add-employee.dto-port';
import {
  DELETE_EMPLOYEE_DTO_PORT,
  DeleteEmployeeDtoPort,
} from './ports/secondary/dto/employee/delete-employee.dto-port';
import {
  UPDATE_EMPLOYEE_DTO_PORT,
  UpdateEmployeeDtoPort,
} from './ports/secondary/dto/employee/update-employee.dto-port';
import {
  CREATE_NEW_USER_DTO_PORT,
  CreateNewUserDtoPort,
} from './ports/secondary/dto/register/create-new-user.dto-port';
import { EmployeeListQuery } from './ports/primary/query/employee/employee-list.query';
import { AddEmployeeCommand } from './ports/primary/command/add-employee.command';
import { EmployeeContext } from './ports/secondary/context/employee/employee.context';
import { UpdateEmployeeCommand } from './ports/primary/command/update-employee.command';
import { RegisterUserCommand } from './ports/primary/command/register-user.command';
import { mapFromEmployeeContext } from './employee.mapper';

@Injectable()
export class EmployeeState
  implements
    LoadEmployeesCommandPort,
    GetCurrencyEmployeeListQueryPort,
    AddEmployeeCommandPort,
    DeleteEmployeeCommandPort,
    UpdateEmployeeCommandPort,
    RegisterUserCommandPort
{
  constructor(
    @Inject(GET_ALL_EMPLOYEE_DTO_PORT)
    private _getAllEmployeeDtoPort: GetAllEmployeeDtoPort,
    @Inject(EMPLOYEE_CONTEXT_PORT)
    private _employeeContextPort: EmployeeContextPort,
    @Inject(ADD_EMPLOYEE_DTO_PORT)
    private _addEmployeeDtoPort: AddEmployeeDtoPort,
    @Inject(DELETE_EMPLOYEE_DTO_PORT)
    private _deleteEmployeeDtoPort: DeleteEmployeeDtoPort,
    @Inject(CREATE_NEW_USER_DTO_PORT)
    private _createNewUserDtoPort: CreateNewUserDtoPort,
    @Inject(UPDATE_EMPLOYEE_DTO_PORT)
    private _updateEmployeeDtoPort: UpdateEmployeeDtoPort,
  ) {}

  load(): Observable<void> {
    return this._getAllEmployeeDtoPort
      .getAll()
      .pipe(
        switchMap((employeeList) =>
          this._employeeContextPort.setState({ employeeList: employeeList })
        )
      );
  }

  getCurrencyEmployeeList(): Observable<EmployeeListQuery> {
    return this._employeeContextPort
      .select()
      .pipe(map((employee) => mapFromEmployeeContext(employee)));
  }

  add(command: AddEmployeeCommand): Observable<void> {
    return this._addEmployeeDtoPort.add(command).pipe(
      switchMap(() => this._getAllEmployeeDtoPort.getAll()),
      switchMap((employeeList) =>
        this._employeeContextPort.setState({ employeeList: employeeList })
      )
    );
  }

  delete(individualId: number): Observable<void> {
    return this._deleteEmployeeDtoPort.delete(individualId).pipe(
      switchMap(() => this._employeeContextPort.select().pipe(take(1))),
      map((employeeContext: EmployeeContext) => {
        return {
          ...employeeContext,
          employeeList: employeeContext.employeeList.filter(
            (e) => e.individualId !== individualId
          ),
        };
      }),
      switchMap((employeeContext) =>
        this._employeeContextPort.setState(employeeContext)
      )
    );
  }

  update(command: UpdateEmployeeCommand): Observable<void> {
    return this._updateEmployeeDtoPort.update(command).pipe(
      switchMap(() => this._getAllEmployeeDtoPort.getAll()),
      switchMap((employeeList) =>
        this._employeeContextPort.setState({ employeeList: employeeList })
      )
    );
  }

  // register(registerUser: RegisterUserCommand): Observable<void> {
  //   return this._createNewUserDtoPort.create(registerUser).pipe(
  //     switchMap(() => this._getAllEmployeeDtoPort.getAll()),
  //     switchMap((employeeList) =>
  //       this._employeeContextPort.setState({ employeeList: employeeList })
  //     )
  //   );
  // }
  register(registerUser: RegisterUserCommand): Observable<void> {
    return this._createNewUserDtoPort.create(registerUser);
  }
}
