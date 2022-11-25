import { NgModule } from '@angular/core';
import { TaskState } from './task.state';
import { ADD_TASK_COMMAND_PORT } from './ports/primary/command/add-task.command-port';
import { LOAD_TASK_COMMAND_PORT } from './ports/primary/command/load-task.command-port';
import { LOAD_EMPLOYEE_COMMAND_PORT } from './ports/primary/command/load-employee.command-port';
import { GET_CURRENCY_EMPLOYEE_LIST_QUERY_PORT } from './ports/primary/query/employee/get-currency-employee-list.query-port';
import { GET_CURRENCY_TASK_LIST_QUERY_PORT } from './ports/primary/query/task/get-currency-task-list.query-port';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    TaskState,
    { provide: ADD_TASK_COMMAND_PORT, useExisting: TaskState },
    { provide: LOAD_TASK_COMMAND_PORT, useExisting: TaskState },
    { provide: LOAD_EMPLOYEE_COMMAND_PORT, useExisting: TaskState },
    { provide: GET_CURRENCY_EMPLOYEE_LIST_QUERY_PORT, useExisting: TaskState },
    { provide: GET_CURRENCY_TASK_LIST_QUERY_PORT, useExisting: TaskState }
  ],
  exports: [],
})
export class TaskStateModule { }