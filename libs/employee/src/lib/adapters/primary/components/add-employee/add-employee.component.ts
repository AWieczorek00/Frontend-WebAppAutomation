import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import {
  ADD_EMPLOYEE_COMMAND_PORT,
  AddEmployeeCommandPort,
} from '../../../../application/ports/primary/command/add-employee.command-port';
import {
  REGISTER_USER_COMMAND_PORT,
  RegisterUserCommandPort,
} from '../../../../application/ports/primary/command/register-user.command-port';
import { AddEmployeeCommand } from '../../../../application/ports/primary/command/add-employee.command';
import { RegisterUserCommand } from '../../../../application/ports/primary/command/register-user.command';
import { EmployeeQuery } from '../../../../application/ports/primary/query/employee/employee.query';

@Component({
  selector: 'lib-add-employee',
  styleUrls: ['./add-employee.component.scss'],
  templateUrl: './add-employee.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEmployeeComponent {
  readonly employee: FormGroup = new FormGroup({
    firstName: new FormControl(),
    secondName: new FormControl(),
    lastName: new FormControl(),
    phoneNumber: new FormControl(),
    email: new FormControl(),
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(
    @Inject(ADD_EMPLOYEE_COMMAND_PORT)
    private _addEmployeeCommandPort: AddEmployeeCommandPort,
    @Inject(REGISTER_USER_COMMAND_PORT)
    private _registerUserCommandPort: RegisterUserCommandPort
  ) {}

  // onEmployeeSubmitted(employee: FormGroup): void {
  //   this._addEmployeeCommandPort
  //     .add(
  //       new AddEmployeeCommand(
  //         employee.get('firstName')?.value,
  //         employee.get('secondName')?.value,
  //         employee.get('lastName')?.value,
  //         employee.get('phoneNumber')?.value,
  //         employee.get('email')?.value,
  //         employee.get('login')?.value,
  //         employee.get('password')?.value
  //       )
  //     )
  //     .pipe(take(1))
  //     .subscribe(()=>this.employee.reset());
  // }

  onEmployeeSubmitted(employee: FormGroup): void {
    console.log(employee)
    this._registerUserCommandPort
      .register(
        new RegisterUserCommand(
          employee.get('username')?.value,
          employee.get('email')?.value,
          employee.get('password')?.value,
          new EmployeeQuery(
            0,
            employee.get('firstName')?.value,
            employee.get('secondName')?.value,
            employee.get('lastName')?.value,
            employee.get('phoneNumber')?.value,
            employee.get('email')?.value
          )
        )
      )
      .pipe(take(1))
      .subscribe(() => this.employee.reset());
  }
}
