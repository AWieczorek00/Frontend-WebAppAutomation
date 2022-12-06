import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeListQuery } from '../../../../application/ports/primary/query/employee/employee-list.query';
import {
  GET_CURRENCY_EMPLOYEE_LIST_QUERY_PORT,
  GetCurrencyEmployeeListQueryPort,
} from '../../../../application/ports/primary/query/employee/get-currency-employee-list.query-port';
import {
  DELETE_EMPLOYEE_COMMAND_PORT,
  DeleteEmployeeCommandPort,
} from '../../../../application/ports/primary/command/delete-employee.command-port';
import { EmployeeQuery } from '../../../../application/ports/primary/query/employee/employee.query';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from "@angular/material/dialog";
import {UpdateEmployeeComponent} from "../update-employee/update-employee.component";

@Component({
  selector: 'lib-employee-list',
  styleUrls: ['./employee-list.component.scss'],
  templateUrl: './employee-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent {
  readonly employeeList$: Observable<EmployeeListQuery> =
    this._getCurrencyEmployeeListQueryPort.getCurrencyEmployeeList();

  constructor(
    @Inject(GET_CURRENCY_EMPLOYEE_LIST_QUERY_PORT)
    private _getCurrencyEmployeeListQueryPort: GetCurrencyEmployeeListQueryPort,
    @Inject(DELETE_EMPLOYEE_COMMAND_PORT)
    private _deleteEmployeeCommandPort: DeleteEmployeeCommandPort,
    public _dialog: MatDialog,
  ) {
    this.employeeList$.subscribe(
      (employee) => (this.dataSourceEmployee.data = employee.employeeList)
    );
  }

  dataSourceEmployee = new MatTableDataSource<EmployeeQuery>();
  nameRows = ['firstName', 'secondName', 'lastName', 'options'];

  delete(individualId: number) {
    this._deleteEmployeeCommandPort.delete(individualId).subscribe()
  }

  update(individualId: number) {
    this._dialog.open(UpdateEmployeeComponent,{
      height:'300px',
      data:{
        individualId:individualId
      }
    })
  }
}
