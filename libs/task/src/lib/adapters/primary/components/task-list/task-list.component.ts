import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { TaskListQuery } from '../../../../application/ports/primary/query/task/task-list.query';
import { TaskQuery } from '../../../../application/ports/primary/query/task/task.query';
import {
  GET_CURRENCY_TASK_LIST_QUERY_PORT,
  GetCurrencyTaskListQueryPort,
} from '../../../../application/ports/primary/query/task/get-currency-task-list.query-port';
import {
  DONE_TASK_UPDATE_COMMAND_PORT,
  DoneTaskUpdateCommandPort,
} from '../../../../application/ports/primary/command/done-task-update.command-port';
import { AddTaskComponent } from '../add-task/add-task.component';
import { DoneTaskCommand } from '../../../../application/ports/primary/command/done-task.command';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

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
  rowName = ['name', 'executionTime', 'employee', 'done', 'options'];
  dataSourceTask = new MatTableDataSource<TaskQuery>();

  constructor(
    @Inject(GET_CURRENCY_TASK_LIST_QUERY_PORT)
    private _getCurrencyTaskListQueryPort: GetCurrencyTaskListQueryPort,
    public dialog: MatDialog,
    @Inject(DONE_TASK_UPDATE_COMMAND_PORT)
    private _doneTaskUpdateCommandPort: DoneTaskUpdateCommandPort
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

  delete(id: number) {}

  updateDone(task: TaskQuery) {
    let done;
    if (task.done) {
      done = false;
    } else {
      done = true;
    }

    this._doneTaskUpdateCommandPort
      .done(
        new DoneTaskCommand(
          task.id,
          task.name,
          done,
          task.executionTime,
          task.employee
        )
      )
      .pipe(take(1))
      .subscribe();

    this.taskList$.subscribe(
      (task) => (this.dataSourceTask.data = task.taskList)
    );
  }
}
