import {
  Directive,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  Output,
} from '@angular/core';
import {
  DELETE_ORDER_COMMAND_PORT,
  DeleteOrderCommandPort,
} from '../../../application/ports/primary/command/order/delete-order.command-port';
import { DeleteOrderCommand } from '../../../application/ports/primary/command/order/delete-order.command';
import { take } from 'rxjs/operators';

@Directive({ selector: '[libDeleteOrder]' })
export class DeleteOrderDirective {
  private _orderId!: number;

  @Input() set libDeleteOrder(orderId: number) {
    this._orderId = orderId;
  }

  @Output() onDeleteOrder = new EventEmitter();

  constructor(
    @Inject(DELETE_ORDER_COMMAND_PORT)
    private _deleteOrderCommandPort: DeleteOrderCommandPort
  ) {}

  @HostListener('click')
  onClicked(): void {
    this._deleteOrderCommandPort
      .deleteOrder(new DeleteOrderCommand(this._orderId))
      .pipe(take(1))
      .subscribe(() => this.onDeleteOrder.emit());
  }
}
