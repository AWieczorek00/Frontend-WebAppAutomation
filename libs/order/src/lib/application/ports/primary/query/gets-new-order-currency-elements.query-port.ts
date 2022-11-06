import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { NewOrderQuery } from './new-order.query';

export const GETS_NEW_ORDER_CURRENCY_ELEMENTS_QUERY_PORT = new InjectionToken<GetsNewOrderCurrencyElementsQueryPort>('GETS_NEW_ORDER_CURRENCY_ELEMENTS_QUERY_PORT');

export interface GetsNewOrderCurrencyElementsQueryPort {
  getNewOrderCurrencyElements(): Observable<NewOrderQuery>;
}
