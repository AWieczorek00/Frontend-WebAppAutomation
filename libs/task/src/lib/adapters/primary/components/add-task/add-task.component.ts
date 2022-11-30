import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {map, Observable, pipe, startWith} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import { EmployeeQuery } from '../../../../application/ports/primary/query/employee/employee.query';
import { EmployeeListQuery } from '../../../../application/ports/primary/query/employee/employee-list.query';
import {
  ADD_TASK_COMMAND_PORT,
  AddTaskCommandPort,
} from '../../../../application/ports/primary/command/add-task.command-port';
import {
  GET_CURRENCY_EMPLOYEE_LIST_QUERY_PORT,
  GetCurrencyEmployeeListQueryPort,
} from '../../../../application/ports/primary/query/employee/get-currency-employee-list.query-port';
import { AddTaskCommand } from '../../../../application/ports/primary/command/add-task.command';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'lib-add-task',
  styleUrls: ['./add-task.component.scss'],
  templateUrl: './add-task.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTaskComponent {
  readonly task: FormGroup = new FormGroup({
    name: new FormControl(),
    employee: new FormControl(),
    executionTime: new FormControl(),
  });
  employee!: EmployeeQuery;
  employeeControl = new FormControl('');
  filteredEmployee: Observable<EmployeeQuery[]> | undefined;
  employeeListAutocomplete: EmployeeQuery[] = [];
  employeeList!: EmployeeQuery[];
  dataSourceEmployee = new MatTableDataSource<EmployeeQuery>();
  readonly employee$: Observable<EmployeeListQuery> =
    this._getCurrencyEmployeeListQueryPort.getCurrencyEmployeeList();

  constructor(
    @Inject(ADD_TASK_COMMAND_PORT)
    private _addTaskCommandPort: AddTaskCommandPort,
    @Inject(GET_CURRENCY_EMPLOYEE_LIST_QUERY_PORT)
    private _getCurrencyEmployeeListQueryPort: GetCurrencyEmployeeListQueryPort,
    public dialogRef: MatDialogRef<AddTaskComponent>,

  ) {

    this.employee$.subscribe((employeeList) =>this.employeeListAutocomplete=employeeList.employeeList)


    this.filteredEmployee = this.employeeControl.valueChanges.pipe(
      startWith({} as EmployeeQuery),
      map((employee) =>
        employee && typeof employee === 'object' ? employee.firstName : employee
      ),
      map((firstName: string) =>
        firstName
          ? this._filterEmployee(firstName)
          : this.employeeListAutocomplete.slice()
      )
    );

  }

  onTaskSubmitted(task: FormGroup): void {
    console.log(task.value)
    console.log(this.employeeControl?.value)
    this._addTaskCommandPort.add(
      new AddTaskCommand(
        task.get('name')?.value,
        task.get('executionTime')?.value,
        false,
        this.employeeControl?.value
      )
    ).pipe(take(1))
      .subscribe();
    this.dialogRef.close()
  }

  getEmployee(employee: EmployeeQuery) {
    this.employee = employee;
  }

  getOptionEmployee(employeeQueries: EmployeeQuery) {
    if (employeeQueries.lastName) {
      return employeeQueries.firstName + ' ' + employeeQueries.lastName;
    }
    return '';
  }

  _filterEmployee(firstName: string): EmployeeQuery[] {
    return this.employeeListAutocomplete.filter(
      (option) =>
        option.firstName.toLowerCase().indexOf(firstName.toLowerCase()) === 0
    );
  }

  addEmployee() {
    if (this.employee) {
      this.employeeList.push(this.employee);

      this.dataSourceEmployee = new MatTableDataSource<EmployeeQuery>(
        this.employeeList
      );
    }
  }
}
