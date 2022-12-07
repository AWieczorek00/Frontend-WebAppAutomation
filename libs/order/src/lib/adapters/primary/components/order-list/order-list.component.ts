import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NewOrderQuery } from '../../../../application/ports/primary/query/new-order.query';
import { EmployeeQuery } from '../../../../application/ports/primary/query/employee.query';
import {
  GETS_CURRENT_ORDER_LIST_QUERY_PORT,
  GetsCurrentOrderListQueryPort,
} from '../../../../application/ports/primary/query/gets-current-order-list.query-port';
import {
  DUPLICATE_ORDER_COMMAND_PORT,
  DuplicateOrderCommandPort,
} from '../../../../application/ports/primary/command/duplicate-order.command-port';
import {
  GETS_NEW_ORDER_CURRENCY_ELEMENTS_QUERY_PORT,
  GetsNewOrderCurrencyElementsQueryPort,
} from '../../../../application/ports/primary/query/gets-new-order-currency-elements.query-port';
import { OrderQuery } from '../../../../application/ports/primary/query/order.query';
import { OrderListQuery } from '../../../../application/ports/primary/query/order-list.query';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'lib-order-list',
  styleUrls: ['./order-list.component.scss'],
  templateUrl: './order-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent {
  roles: string | null;
  readonly employeeList$: Observable<NewOrderQuery> =
    this._getsNewOrderCurrencyElementsQueryPort.getNewOrderCurrencyElements();
  private _statusSubject: Subject<string> = new Subject<string>();
  public status$: Observable<string> = this._statusSubject.asObservable();
  private _prioritySubject: Subject<string> = new Subject<string>();
  public priority$: Observable<string> = this._prioritySubject.asObservable();
  private _employeeSubject: Subject<string> = new Subject<string>();
  public employee$: Observable<string> = this._employeeSubject.asObservable();

  constructor(
    @Inject(GETS_CURRENT_ORDER_LIST_QUERY_PORT)
    private _getsCurrentOrderListQueryPort: GetsCurrentOrderListQueryPort,
    private _router: Router,
    @Inject(DUPLICATE_ORDER_COMMAND_PORT)
    private _duplicateOrderCommandPort: DuplicateOrderCommandPort,
    @Inject(GETS_NEW_ORDER_CURRENCY_ELEMENTS_QUERY_PORT)
    private _getsNewOrderCurrencyElementsQueryPort: GetsNewOrderCurrencyElementsQueryPort
  ) {
    this.orders$.subscribe((data) => (this.dataSource.data = data));
    this.roles = localStorage.getItem('roles');
    this._statusSubject.next('');
    this._prioritySubject.next('');
    this._employeeSubject.next('');
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  readonly orders$: Observable<OrderQuery[]> = combineLatest([
    this._getsCurrentOrderListQueryPort.getCurrentOrderList(),
    this.status$,
    this.priority$,
    this.employee$,
  ]).pipe(
    map(
      ([orderList, status, priority, employee]: [
        OrderListQuery,
        string,
        string,
        string
      ]) => {
        return this.filterOrderList(
          orderList.orderList,
          status,
          priority,
          employee
        );
      }
    )
  );

  dataSource = new MatTableDataSource<OrderQuery>();

  name: string[] = [
    'name',
    'firstName',
    'dateOfAdmission',
    'dateOfExecution',
    'priority',
    'status',
    'options',
  ];
  priority: any = '';
  employee: any = '';
  status: any = '';

  newOrder() {
    this._router.navigate(['/new-order']);
  }

  duplicateOrder(order: OrderQuery) {
    console.log('test');
    this._duplicateOrderCommandPort
      .duplicateOrder(order.id)
      .pipe(take(1))
      .subscribe();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSelectPriority($event: MatSelectChange) {
    this._prioritySubject.next($event.value);
  }

  onSelectEmployee($event: MatSelectChange) {
    console.log($event.value.firstName + ' ' + $event.value.lastName);
    this._employeeSubject.next(
      $event.value.firstName + ' ' + $event.value.lastName
    );
  }

  onSelectStatus($event: MatSelectChange) {
    this._statusSubject.next($event.value);
  }

  filterOrderList(
    orderList: OrderQuery[],
    status: string,
    priority: string,
    employee: string
  ): OrderQuery[] {
    if (status === '' && priority === '' && employee === '') {
      return orderList;
    }
    if (status !== '' && priority === '' && employee === '') {
      return orderList.filter((order) => order.status === status);
    }
    if (status === '' && priority !== '' && employee === '') {
      return orderList.filter((order) => order.priority === priority);
    }
    if (status === '' && priority === '' && employee !== '') {
      return orderList.filter(
        (order) =>
          order.employeeList[0].firstName +
            ' ' +
            order.employeeList[0].lastName ===
          employee
      );
    }
    if (status !== '' && priority !== '' && employee === '') {
      return orderList
        .filter((order) => order.status === status)
        .filter((order) => order.priority === priority);
    }
    if (status !== '' && priority === '' && employee !== '') {
      return orderList
        .filter((order) => order.status === status)
        .filter(
          (order) =>
            order.employeeList[0].firstName +
              ' ' +
              order.employeeList[0].lastName ===
            employee
        );
    }
    if (status === '' && priority !== '' && employee !== '') {
      return orderList
        .filter(
          (order) =>
            order.employeeList[0].firstName +
              ' ' +
              order.employeeList[0].lastName ===
            employee
        )
        .filter((order) => order.priority === priority);
    }

    if (status !== '' && priority !== '' && employee !== '') {
      return orderList
        .filter((order) => order.status === status)
        .filter((order) => order.priority === priority)
        .filter(
          (order) =>
            order.employeeList[0].firstName +
              ' ' +
              order.employeeList[0].lastName ===
            employee
        );
    }

    return orderList;
  }

  resetFilter() {
    this.priority=''
    this.status=''
    this.employee=''
    this._prioritySubject.next('');
    this._statusSubject.next('');
    this._employeeSubject.next('')
  }
}
