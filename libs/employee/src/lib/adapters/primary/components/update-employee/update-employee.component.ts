import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { EmployeeQuery } from '../../../../application/ports/primary/query/employee/employee.query';
import {
  GET_ONE_EMPLOYEE_DTO_PORT,
  GetOneEmployeeDtoPort,
} from '../../../../application/ports/secondary/dto/employee/get-one-employee.dto-port';
import {
  LOAD_EMPLOYEES_COMMAND_PORT,
  LoadEmployeesCommandPort,
} from '../../../../application/ports/primary/command/load-employees.command-port';
import {
  UPDATE_EMPLOYEE_COMMAND_PORT,
  UpdateEmployeeCommandPort,
} from '../../../../application/ports/primary/command/update-employee.command-port';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateEmployeeCommand } from '../../../../application/ports/primary/command/update-employee.command';
import { take } from 'rxjs/operators';

@Component({
  selector: 'lib-update-employee',
  styleUrls: ['./update-employee.component.scss'],
  templateUrl: './update-employee.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateEmployeeComponent {
  // readonly employee$: Observable<EmployeeQuery> =
  //   this._activatedRoute.params.pipe(
  //     switchMap((params) =>
  //       this._getOneEmployeeDtoPort.getOne(params['individualId'])
  //     )
  //   );
  readonly employee$: Observable<EmployeeQuery> =
    this._getOneEmployeeDtoPort.getOne(this.data.individualId);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(GET_ONE_EMPLOYEE_DTO_PORT)
    public _getOneEmployeeDtoPort: GetOneEmployeeDtoPort,
    @Inject(LOAD_EMPLOYEES_COMMAND_PORT)
    private _loadEmployeesCommandPort: LoadEmployeesCommandPort,
    private _activatedRoute: ActivatedRoute,
    @Inject(UPDATE_EMPLOYEE_COMMAND_PORT)
    private _updateEmployeeCommandPort: UpdateEmployeeCommandPort
  ) {
    this.employee$.subscribe((employee) =>
      this.employee.setValue({
        individualId: employee.individualId,
        firstName: employee.firstName,
        secondName: employee.secondName,
        lastName: employee.lastName,
        phoneNumber: employee.phoneNumber,
        email: employee.email,
      })
    );
  }

  readonly employee: FormGroup = new FormGroup({
    individualId: new FormControl(),
    firstName: new FormControl(),
    secondName: new FormControl(),
    lastName: new FormControl(),
    phoneNumber: new FormControl(),
    email: new FormControl(),
  });

  onEmployeeSubmitted(employee: FormGroup) {
    this._updateEmployeeCommandPort
      .update(
        new UpdateEmployeeCommand(
          employee.get('individualId')?.value,
          employee.get('firstName')?.value,
          employee.get('secondName')?.value,
          employee.get('lastName')?.value,
          employee.get('phoneNumber')?.value,
          employee.get('email')?.value
        )
      )
      .pipe(take(1))
      .subscribe();
  }
}
