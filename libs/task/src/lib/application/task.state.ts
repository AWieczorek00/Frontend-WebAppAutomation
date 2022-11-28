import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AddTaskCommandPort } from './ports/primary/command/add-task.command-port';
import { LoadTaskCommandPort } from './ports/primary/command/load-task.command-port';
import { LoadEmployeeCommandPort } from './ports/primary/command/load-employee.command-port';
import { GetCurrencyEmployeeListQueryPort } from './ports/primary/query/employee/get-currency-employee-list.query-port';
import { GetCurrencyTaskListQueryPort } from './ports/primary/query/task/get-currency-task-list.query-port';
import {
  ADD_TASK_DTO_PORT,
  AddTaskDtoPort,
} from './ports/secondary/dto/task/add-task.dto-port';
import {
  GET_ALL_TASK_DTO_PORT,
  GetAllTaskDtoPort,
} from './ports/secondary/dto/task/get-all-task.dto-port';
import {
  PATCH_TASK_CONTEXT_PORT,
  PatchTaskContextPort,
} from './ports/secondary/context/task/patch-task.context-port';
import {
  GET_ALL_EMPLOYEE_DTO_PORT,
  GetAllEmployeeDtoPort,
} from './ports/secondary/dto/employee/get-all-employee.dto-port';
import {
  SELECT_TASK_CONTEXT_CONTEXT_PORT,
  SelectTaskContextContextPort,
} from './ports/secondary/context/task/select-task-context.context-port';
import {
  SET_STATE_EMPLOYEE_CONTEXT_PORT,
  SetStateEmployeeContextPort,
} from './ports/secondary/context/employee/set-state-employee.context-port';
import {
  SELECT_EMPLOYEE_CONTEXT_PORT,
  SelectEmployeeContextPort,
} from './ports/secondary/context/employee/select-employee.context-port';
import { AddTaskCommand } from './ports/primary/command/add-task.command';
import { EmployeeListQuery } from './ports/primary/query/employee/employee-list.query';
import { TaskListQuery } from './ports/primary/query/task/task-list.query';
import { mapFromEmployeeContext } from './mappers/employee.mapper';
import { mapFromTaskContext } from './mappers/task.mapper';

@Injectable()
export class TaskState
  implements
    AddTaskCommandPort,
    LoadTaskCommandPort,
    LoadEmployeeCommandPort,
    GetCurrencyEmployeeListQueryPort,
    GetCurrencyTaskListQueryPort
{
  constructor(
    @Inject(ADD_TASK_DTO_PORT) private _addTaskDtoPort: AddTaskDtoPort,
    @Inject(GET_ALL_TASK_DTO_PORT)
    private _getAllTaskDtoPort: GetAllTaskDtoPort,
    @Inject(PATCH_TASK_CONTEXT_PORT)
    private _patchTaskContextPort: PatchTaskContextPort,
    @Inject(GET_ALL_EMPLOYEE_DTO_PORT)
    private _getAllEmployeeDtoPort: GetAllEmployeeDtoPort,
    @Inject(SELECT_TASK_CONTEXT_CONTEXT_PORT)
    private _selectTaskContextContextPort: SelectTaskContextContextPort,
    @Inject(SET_STATE_EMPLOYEE_CONTEXT_PORT)
    private _setStateEmployeeContextPort: SetStateEmployeeContextPort,
    @Inject(SELECT_EMPLOYEE_CONTEXT_PORT)
    private _selectEmployeeContextPort: SelectEmployeeContextPort
  ) {}
  loadTask(): Observable<void> {
    return this._getAllTaskDtoPort
      .getAll()
      .pipe(
        switchMap((taskList) =>
          this._patchTaskContextPort.patch({ taskList: taskList })
        )
      );
  }

  loadEmployee(): Observable<void> {
    return this._getAllEmployeeDtoPort.getAll().pipe(
      switchMap((employeeList) =>
        this._setStateEmployeeContextPort.setState({
          employeeList: employeeList,
        })
      )
    );
  }

  getCurrencyEmployeeList(): Observable<EmployeeListQuery> {
    return this._selectEmployeeContextPort
      .select()
      .pipe(map((employee) => mapFromEmployeeContext(employee)));
  }

  getCurrencyTaskList(): Observable<TaskListQuery> {
    return this._selectTaskContextContextPort
      .select()
      .pipe(map((task) => mapFromTaskContext(task)));
  }

  add(command: AddTaskCommand): Observable<void> {
    return this._addTaskDtoPort.add(command).pipe(
      switchMap(() => this._getAllTaskDtoPort.getAll()),
      switchMap((taskList) =>
        this._patchTaskContextPort.patch({ taskList: taskList })
      )
    );
  }
}

// return this._duplicateOrderDtoPort.duplicateOrder(id).pipe(
//   switchMap(() => this._getAllDtoPort.getAll()),
//   switchMap((orderList) =>
//     this._setsStateOrderContextPort.setState({ orderList: orderList })
//   )
// );
