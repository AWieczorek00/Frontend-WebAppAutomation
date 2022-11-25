import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeListQuery } from './employee-list.query';

export const GET_CURRENCY_EMPLOYEE_LIST_QUERY_PORT =
  new InjectionToken<GetCurrencyEmployeeListQueryPort>(
    'GET_CURRENCY_EMPLOYEE_LIST_QUERY_PORT'
  );

export interface GetCurrencyEmployeeListQueryPort {
  getCurrencyEmployeeList(): Observable<EmployeeListQuery>;
}
