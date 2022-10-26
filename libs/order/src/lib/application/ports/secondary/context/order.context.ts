import { OrderDto } from '../dto/order.dto';

export interface OrderContext {
  readonly orderList: OrderDto[];
}
