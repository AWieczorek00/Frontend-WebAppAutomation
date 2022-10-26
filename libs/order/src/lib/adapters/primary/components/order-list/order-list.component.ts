import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { map, Observable } from 'rxjs';
import { OrderListQuery } from '../../../../application/ports/primary/query/order-list.query';
import {
  GET_ALL_DTO_PORT,
  GetAllDtoPort,
} from '../../../../application/ports/secondary/dto/get-all.dto-port';
import {
  GETS_CURRENT_ORDER_LIST_QUERY_PORT,
  GetsCurrentOrderListQueryPort,
} from '../../../../application/ports/primary/query/gets-current-order-list.query-port';
import { OrderDto } from '../../../../application/ports/secondary/dto/order.dto';

@Component({
  selector: 'lib-order-list',
  styleUrls: ['./order-list.component.scss'],
  templateUrl: './order-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent {
  readonly test$: Observable<OrderListQuery> =
    this._getsCurrentOrderListQueryPort.getCurrentOrderList();

  constructor(
    @Inject(GET_ALL_DTO_PORT) private _getAllDtoPort: GetAllDtoPort,
    @Inject(GETS_CURRENT_ORDER_LIST_QUERY_PORT)
    private _getsCurrentOrderListQueryPort: GetsCurrentOrderListQueryPort
  ) {
    this.data$.subscribe(data=>console.log(data))
  }

  data$: Observable<OrderDto[]> = this._getAllDtoPort
    .getAll()

}
