import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LoadOrdersCommandPort } from './ports/primary/command/order/load-orders.command-port';
import { GetsCurrentOrderListQueryPort } from './ports/primary/query/gets-current-order-list.query-port';
import { GetsCurrentClientListQueryPort } from './ports/primary/query/gets-current-client-list.query-port';
import { LoadClientsCommandPort } from './ports/primary/command/client/load-clients.command-port';
import { LoadEmployeesCommandPort } from './ports/primary/command/employee/load-employees.command-port';
import { GetsNewOrderCurrencyElementsQueryPort } from './ports/primary/query/gets-new-order-currency-elements.query-port';
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
import {
  GET_ALL_EMPLOYEE_DTO_PORT,
  GetAllEmployeeDtoPort,
} from './ports/secondary/dto/employee/get-all-employee.dto-port';
import {
  NEW_ORDER_CONTEXT_PORT,
  NewOrderContextPort,
} from './ports/secondary/context/new-order/new-order.context-port';
import {
  EMPLOYEE_CONTEXT_PORT,
  EmployeeContextPort,
} from './ports/secondary/context/employee/employee.context-port';
import { LoadOrdersCommand } from './ports/primary/command/order/load-orders.command';
import { OrderListQuery } from './ports/primary/query/order-list.query';
import { ClientListQuery } from './ports/primary/query/client-list.query';
import { NewOrderQuery } from './ports/primary/query/new-order.query';
import { mapFromOrderContext } from './mappers/order.mapper';
import { mapFormClientContext } from './mappers/client.mapper';
import {mapFromNewOrderContext} from "./mappers/newOrderElements.mapper";

@Injectable()
export class OrderState
  implements
    LoadOrdersCommandPort,
    GetsCurrentOrderListQueryPort,
    GetsCurrentClientListQueryPort,
    LoadClientsCommandPort,
    LoadEmployeesCommandPort,
    GetsNewOrderCurrencyElementsQueryPort
{
  constructor(
    @Inject(GET_ALL_DTO_PORT) private _getAllDtoPort: GetAllDtoPort,
    @Inject(SETS_STATE_ORDER_CONTEXT_PORT)
    private _setsStateOrderContextPort: SetsStateOrderContextPort,
    @Inject(SELECT_ORDER_CONTEXT_PORT)
    private _selectOrderContextPort: SelectOrderContextPort,
    @Inject(GET_ALL_CLIENT_DTO_PORT)
    private _getAllClientDtoPort: GetAllClientDtoPort,
    @Inject(CLIENT_CONTEXT_PORT) private _clientContextPort: ClientContextPort,
    @Inject(GET_ALL_EMPLOYEE_DTO_PORT)
    private _getAllEmployeeDtoPort: GetAllEmployeeDtoPort,
    @Inject(NEW_ORDER_CONTEXT_PORT)
    private _newOrderContextPort: NewOrderContextPort,
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
          this._newOrderContextPort.patch({ clientList: client })
        )
      );
  }

  getCurrentClientList(): Observable<ClientListQuery> {
    return this._clientContextPort
      .select()
      .pipe(map((client) => mapFormClientContext(client)));
  }

  loadEmployees(): Observable<void> {
    return this._getAllEmployeeDtoPort
      .getAll()
      .pipe(
        switchMap((employees) =>
          this._newOrderContextPort.patch({ employeeList: employees })
        )
      );
  }

  getNewOrderCurrencyElements(): Observable<NewOrderQuery> {
    return this._newOrderContextPort.select().pipe(map((elements)=> mapFromNewOrderContext(elements)))
  }

}
