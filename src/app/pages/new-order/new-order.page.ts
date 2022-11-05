import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-new-order-page',
  styleUrls: ['./new-order.page.scss'],
  templateUrl: './new-order.page.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewOrderPage {
}
