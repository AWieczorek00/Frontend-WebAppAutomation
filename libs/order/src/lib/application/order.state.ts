import { Inject, Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoadOrdersCommandPort } from './ports/primary/command/load-orders.command-port';
import { GetsCurrentOrderListQueryPort } from './ports/primary/query/gets-current-order-list.query-port';
import {
  GET_ALL_DTO_PORT,
  GetAllDtoPort,
} from './ports/secondary/dto/get-all.dto-port';
import {
  SETS_STATE_ORDER_CONTEXT_PORT,
  SetsStateOrderContextPort,
} from './ports/secondary/context/sets-state-order.context-port';
import {
  SELECT_ORDER_CONTEXT_PORT,
  SelectOrderContextPort,
} from './ports/secondary/context/select-order.context-port';
import { LoadOrdersCommand } from './ports/primary/command/load-orders.command';
import { OrderListQuery } from './ports/primary/query/order-list.query';
import {mapFromOrderContext} from "./order.mapper";

@Injectable()
export class OrderState
  implements LoadOrdersCommandPort, GetsCurrentOrderListQueryPort
{
  constructor(
    @Inject(GET_ALL_DTO_PORT) private _getAllDtoPort: GetAllDtoPort,
    @Inject(SETS_STATE_ORDER_CONTEXT_PORT)
    private _setsStateOrderContextPort: SetsStateOrderContextPort,
    @Inject(SELECT_ORDER_CONTEXT_PORT)
    private _selectOrderContextPort: SelectOrderContextPort
  ) {}

  loadOrder(command: LoadOrdersCommand): Observable<void> {
    return this._getAllDtoPort
      .getAll()
      .pipe(
        switchMap((order) =>
          this._setsStateOrderContextPort.setState({ orderList: order })
        )
      );
  }

  getCurrentOrderList(): Observable<OrderListQuery> {
    return this._selectOrderContextPort
      .select()
      .pipe(map((order)=>mapFromOrderContext(order)))
  }
}
