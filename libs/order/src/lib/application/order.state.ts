import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LoadOrdersCommandPort } from './ports/primary/command/order/load-orders.command-port';
import { GetsCurrentOrderListQueryPort } from './ports/primary/query/gets-current-order-list.query-port';
import { GetsCurrentClientListQueryPort } from './ports/primary/query/gets-current-client-list.query-port';
import { LoadClientsCommandPort } from './ports/primary/command/client/load-clients.command-port';
import {
  GET_ALL_DTO_PORT,
  GetAllDtoPort,
} from './ports/secondary/dto/get-all.dto-port';
import {
  SETS_STATE_ORDER_CONTEXT_PORT,
  SetsStateOrderContextPort,
} from './ports/secondary/context/order/sets-state-order.context-port';
import {
  SELECT_ORDER_CONTEXT_PORT,
  SelectOrderContextPort,
} from './ports/secondary/context/order/select-order.context-port';
import {
  GET_ALL_CLIENT_DTO_PORT,
  GetAllClientDtoPort,
} from './ports/secondary/dto/client/get-all-client.dto-port';
import {
  CLIENT_CONTEXT_PORT,
  ClientContextPort,
} from './ports/secondary/context/client/client.context-port';
import { LoadOrdersCommand } from './ports/primary/command/order/load-orders.command';
import { OrderListQuery } from './ports/primary/query/order-list.query';
import { ClientListQuery } from './ports/primary/query/client-list.query';
import { mapFromOrderContext } from './mappers/order.mapper';
import { mapFormClientContext } from './mappers/client.mapper';

@Injectable()
export class OrderState
  implements
    LoadOrdersCommandPort,
    GetsCurrentOrderListQueryPort,
    GetsCurrentClientListQueryPort,
    LoadClientsCommandPort
{
  constructor(
    @Inject(GET_ALL_DTO_PORT) private _getAllDtoPort: GetAllDtoPort,
    @Inject(SETS_STATE_ORDER_CONTEXT_PORT)
    private _setsStateOrderContextPort: SetsStateOrderContextPort,
    @Inject(SELECT_ORDER_CONTEXT_PORT)
    private _selectOrderContextPort: SelectOrderContextPort,
    @Inject(GET_ALL_CLIENT_DTO_PORT)
    private _getAllClientDtoPort: GetAllClientDtoPort,
    @Inject(CLIENT_CONTEXT_PORT) private _clientContextPort: ClientContextPort
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
      .pipe(map((order) => mapFromOrderContext(order)));
  }

  loadClient(): Observable<void> {
    return this._getAllClientDtoPort
      .getAll()
      .pipe(
        switchMap((client) =>
          this._clientContextPort.setState({ clientList: client })
        )
      );
  }

  getCurrentClientList(): Observable<ClientListQuery> {
    return this._clientContextPort
      .select()
      .pipe(map((client) => mapFormClientContext(client)));
  }
}
