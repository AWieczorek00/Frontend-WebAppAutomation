import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-user-menu-page',
  styleUrls: ['./user-menu.page.scss'],
  templateUrl: './user-menu.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UserMenuPage {
}
