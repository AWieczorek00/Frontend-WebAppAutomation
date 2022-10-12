import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({ selector: 'lib-login', templateUrl: './login.component.html', changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./login.component.scss']
  })
export class LoginComponent {
}
