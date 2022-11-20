import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-order-details-page',
  styleUrls: ['./order-details.page.scss'],
  templateUrl: './order-details.page.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailsPage {
}
