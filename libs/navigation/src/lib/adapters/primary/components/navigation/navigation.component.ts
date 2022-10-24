import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'lib-navigation',
  styleUrls: ['./navigation.component.scss'],
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,

})
export class NavigationComponent {
  roles: string | null;
  constructor() {
    this.roles = localStorage.getItem("roles")
    console.log(this.roles)
  }


}
