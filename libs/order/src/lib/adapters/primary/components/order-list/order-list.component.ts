import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from "@angular/core";
import { Observable } from "rxjs";
import {
  GETS_CURRENT_ORDER_LIST_QUERY_PORT,
  GetsCurrentOrderListQueryPort
} from "../../../../application/ports/primary/query/gets-current-order-list.query-port";
import {
  CREATE_ORDER_COMMAND_PORT,
  CreateOrderCommandPort
} from "../../../../application/ports/primary/command/order/create-order.command-port";
import { OrderListQuery } from "../../../../application/ports/primary/query/order-list.query";
import { OrderQuery } from "../../../../application/ports/primary/query/order.query";
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { CreateOrderCommand } from "../../../../application/ports/primary/command/order/create-order.command";
import { take } from "rxjs/operators";

@Component({
  selector: "lib-order-list",
  styleUrls: ["./order-list.component.scss"],
  templateUrl: "./order-list.component.html",
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderListComponent {
  roles: string | null;

  constructor(
    @Inject(GETS_CURRENT_ORDER_LIST_QUERY_PORT)
    private _getsCurrentOrderListQueryPort: GetsCurrentOrderListQueryPort,
    private _router: Router, @Inject(CREATE_ORDER_COMMAND_PORT) private _createOrderCommandPort: CreateOrderCommandPort
  ) {
    this.orders$.subscribe((data) => (this.dataSource.data = data.orders));
    this.orders$.subscribe((data) => console.log(data.orders));
    this.roles = localStorage.getItem("roles");
  }

  readonly orders$: Observable<OrderListQuery> =
    this._getsCurrentOrderListQueryPort.getCurrentOrderList();

  dataSource = new MatTableDataSource<OrderQuery>();


  name: string[] = [
    "name",
    "firstName",
    "dateOfAdmission",
    "dateOfExecution",
    "priority",
    "status",
    "options"
  ];

  newOrder() {
    this._router.navigate(["/new-order"]);
  }

  duplicateOrder(order: OrderQuery) {
    console.log("test");
    this._createOrderCommandPort.createOrder(new CreateOrderCommand(
      NaN,
      order.client,
      [],
      [],
      new Date(),
      new Date(),
      order.priority,
      order.status,
      order.period,
      "")).pipe(take(1)).subscribe();
  }
}
