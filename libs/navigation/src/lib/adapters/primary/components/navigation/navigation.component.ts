import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {window} from "rxjs";


@Component({
  selector: 'lib-navigation',
  styleUrls: ['./navigation.component.scss'],
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,

})
export class NavigationComponent {
  roles: string | null;
  constructor(private _router:Router) {
    this.roles = localStorage.getItem("roles")
    console.log(this.roles)
  }


  logout() {
    localStorage.clear();
    this._router.navigate(['/login'])
  }
}
