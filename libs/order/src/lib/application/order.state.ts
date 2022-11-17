import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { LoadOrdersCommandPort } from './ports/primary/command/order/load-orders.command-port';
import { GetsCurrentOrderListQueryPort } from './ports/primary/query/gets-current-order-list.query-port';
import { LoadClientsCommandPort } from './ports/primary/command/client/load-clients.command-port';
import { LoadEmployeesCommandPort } from './ports/primary/command/employee/load-employees.command-port';
import { GetsNewOrderCurrencyElementsQueryPort } from './ports/primary/query/gets-new-order-currency-elements.query-port';
import { LoadActivitiesTemplateCommandPort } from './ports/primary/command/activitiesTemplate/load-activities-template.command-port';
import { CreateOrderCommandPort } from './ports/primary/command/order/create-order.command-port';
import { LoadPartsTemplateCommandPort } from './ports/primary/command/partsTemplate/load-parts-template.command-port';
import { DeleteOrderCommandPort } from './ports/primary/command/order/delete-order.command-port';
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
  GET_ALL_ACTIVITIES_TEMPLATE_DTO_PORT,
  GetAllActivitiesTemplateDtoPort,
} from './ports/secondary/dto/activitiesTemplate/get-all-activities-template.dto-port';
import {
  ADD_ORDER_DTO_PORT,
  AddOrderDtoPort,
} from './ports/secondary/dto/add-order.dto-port';
import {
  GET_ALL_PARTS_TEMPLATE_DTO_PORT,
  GetAllPartsTemplateDtoPort,
} from './ports/secondary/dto/parts-template/get-all-parts-template.dto-port';
import {
  DELETE_ORDER_DTO_PORT,
  DeleteOrderDtoPort,
} from './ports/secondary/dto/delete-order.dto-port';
import { LoadOrdersCommand } from './ports/primary/command/order/load-orders.command';
import { OrderListQuery } from './ports/primary/query/order-list.query';
import { NewOrderQuery } from './ports/primary/query/new-order.query';
import { CreateOrderCommand } from './ports/primary/command/order/create-order.command';
import { DeleteOrderCommand } from './ports/primary/command/order/delete-order.command';
import { mapFromOrderContext } from './mappers/order.mapper';
import { mapFromNewOrderContext } from './mappers/newOrderElements.mapper';
import { OrderContext } from './ports/secondary/context/order/order.context';

@Injectable()
export class OrderState
  implements
    LoadOrdersCommandPort,
    GetsCurrentOrderListQueryPort,
    LoadClientsCommandPort,
    LoadEmployeesCommandPort,
    GetsNewOrderCurrencyElementsQueryPort,
    LoadActivitiesTemplateCommandPort,
    CreateOrderCommandPort,
    LoadPartsTemplateCommandPort,
    DeleteOrderCommandPort
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
    @Inject(GET_ALL_ACTIVITIES_TEMPLATE_DTO_PORT)
    private _getAllActivitiesTemplateDtoPort: GetAllActivitiesTemplateDtoPort,
    @Inject(ADD_ORDER_DTO_PORT) private _addOrderDtoPort: AddOrderDtoPort,
    @Inject(GET_ALL_PARTS_TEMPLATE_DTO_PORT)
    private _getAllPartsTemplateDtoPort: GetAllPartsTemplateDtoPort,
    @Inject(DELETE_ORDER_DTO_PORT)
    private _deleteOrderDtoPort: DeleteOrderDtoPort
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
    return this._newOrderContextPort
      .select()
      .pipe(map((elements) => mapFromNewOrderContext(elements)));
  }

  loadActivitiesTemplate(): Observable<void> {
    return this._getAllActivitiesTemplateDtoPort.getAll().pipe(
      switchMap((activitiesTemplate) =>
        this._newOrderContextPort.patch({
          activitiesTemplateList: activitiesTemplate,
        })
      )
    );
  }

  createOrder(command: CreateOrderCommand): Observable<void> {
    return this._addOrderDtoPort.add(command);
  }

  loadPartsTemplate(): Observable<void> {
    return this._getAllPartsTemplateDtoPort
      .getAll()
      .pipe(
        switchMap((partsTemplate) =>
          this._newOrderContextPort.patch({ partsTemplate: partsTemplate })
        )
      );
  }

  deleteOrder(command: DeleteOrderCommand): Observable<void> {
    return this._deleteOrderDtoPort.delete(command.orderId).pipe(
      switchMap(() => this._selectOrderContextPort.select().pipe(take(1))),
      map((orderContext: OrderContext) => {
        return {
          ...orderContext,
          orderList: orderContext.orderList.filter(
            (o) => o.id !== command.orderId
          ),
        };
      }),

      switchMap((orderContext) =>
        this._setsStateOrderContextPort.setState(orderContext)
      )
    );
  }
}
