import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ADD_EMPLOYEE_COMMAND_PORT,
  AddEmployeeCommandPort,
} from '../../../../application/ports/primary/command/add-employee.command-port';
import { take } from 'rxjs';
import { AddEmployeeCommand } from '../../../../application/ports/primary/command/add-employee.command';

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
  });

  constructor(
    @Inject(ADD_EMPLOYEE_COMMAND_PORT)
    private _addEmployeeCommandPort: AddEmployeeCommandPort
  ) {}

  onEmployeeSubmitted(employee: FormGroup): void {
    this._addEmployeeCommandPort
      .add(
        new AddEmployeeCommand(
          employee.get('firstName')?.value,
          employee.get('secondName')?.value,
          employee.get('lastName')?.value,
          employee.get('phoneNumber')?.value,
          employee.get('email')?.value
        )
      )
      .pipe(take(1))
      .subscribe(()=>this.employee.reset());
  }
}
