import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from '../../../secondary/services/response/login.response';
import { ADDS_USER_DTO, AddsUserDtoPort } from '../../../../application/ports/secondary/dto/adds-user.dto-port';
import { HttpUserService } from '../../../secondary/services/service/user/http-user.service';

@Component({
  selector: 'lib-login', templateUrl: './login.component.html', changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  readonly loginForm: FormGroup = new FormGroup({ username: new FormControl(), password: new FormControl() });
  private response: LoginResponse | undefined;

  constructor(
    private _router: Router,
    private _httpUserService: HttpUserService) {
  }

  onSumitedLogined(loginForm: FormGroup) {
    this._httpUserService.add({
      username: loginForm.get('username')?.value,
      password: loginForm.get('password')?.value,
    })
      .subscribe((res: any) => {
        if (res !== null) {
          this.response = res;
          console.log(res['roles']);

          localStorage.setItem('token', res['sessionId']);
          localStorage.setItem('roles', res['roles']);
          localStorage.setItem('individualId', res['individualId']);
          if (res['roles'].find((element: string) => element === 'ADMIN'))
            this._router.navigate(['/admin-panel']);
        } else {
          alert('Nie udało ci sie zalogować');
        }
      });
  }


}
