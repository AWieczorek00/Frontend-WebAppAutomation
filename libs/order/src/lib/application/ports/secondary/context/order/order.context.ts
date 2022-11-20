import { OrderDto } from '../../dto/order/order.dto';

export interface OrderContext {
  readonly orderList: OrderDto[];
}
