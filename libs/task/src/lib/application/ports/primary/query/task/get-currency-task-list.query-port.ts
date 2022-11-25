import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskListQuery } from './task-list.query';

export const GET_CURRENCY_TASK_LIST_QUERY_PORT =
  new InjectionToken<GetCurrencyTaskListQueryPort>(
    'GET_CURRENCY_TASK_LIST_QUERY_PORT'
  );

export interface GetCurrencyTaskListQueryPort {
  getCurrencyTaskList(): Observable<TaskListQuery>;
}
