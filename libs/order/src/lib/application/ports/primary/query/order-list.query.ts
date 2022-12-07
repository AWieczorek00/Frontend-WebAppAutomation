import {OrderQuery} from "./order.query";

export class OrderListQuery {
  constructor(
    public readonly orderList: OrderQuery[]
  ) {
  }
}
