import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { TaskListQuery } from '../../../../application/ports/primary/query/task/task-list.query';
import {
  GET_CURRENCY_TASK_LIST_QUERY_PORT,
  GetCurrencyTaskListQueryPort,
} from '../../../../application/ports/primary/query/task/get-currency-task-list.query-port';
import { MatTableDataSource } from '@angular/material/table';
import { TaskQuery } from '../../../../application/ports/primary/query/task/task.query';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'lib-task-list',
  styleUrls: ['./task-list.component.scss'],
  templateUrl: './task-list.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  readonly taskList$: Observable<TaskListQuery> =
    this._getCurrencyTaskListQueryPort.getCurrencyTaskList();
  rowName = ['name', 'executionTime', 'employee'];
  dataSourceTask = new MatTableDataSource<TaskQuery>();

  constructor(
    @Inject(GET_CURRENCY_TASK_LIST_QUERY_PORT)
    private _getCurrencyTaskListQueryPort: GetCurrencyTaskListQueryPort,
    public dialog: MatDialog
  ) {
    this.taskList$.subscribe(
      (taskList) => (this.dataSourceTask.data = taskList.taskList)
    );
  }

  open() {
    this.dialog.open(AddTaskComponent, {
      width: '400px',
    });
  }
}
