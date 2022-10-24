import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lib-order',
  styleUrls: ['./order.component.scss'],
  templateUrl: './order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent {
}
