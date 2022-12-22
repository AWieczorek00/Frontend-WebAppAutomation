import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { GET_ALL_TASK_BY_EMPLOYEE_DTO_PORT, GetAllTaskByEmployeeDtoPort } from '../../../../application/ports/secondary/dto/task/get-all-task-by-employee.dto-port';
import { DONE_TASK_UPDATE_COMMAND_PORT, DoneTaskUpdateCommandPort } from '../../../../application/ports/primary/command/done-task-update.command-port';
import { TaskQuery } from '../../../../application/ports/primary/query/task/task.query';
import { DoneTaskCommand } from '../../../../application/ports/primary/command/done-task.command';
import { MatTableDataSource } from '@angular/material/table';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {DatePipe, formatDate} from '@angular/common';

@Component({
  selector: 'lib-employee-task',
  styleUrls: ['./employee-task.component.scss'],
  templateUrl: './employee-task.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeTaskComponent {
  private _doneSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public done$: Observable<boolean> = this._doneSubject.asObservable();
  private _dateSubject: BehaviorSubject<string> = new BehaviorSubject<string>(formatDate(new Date(), 'yyyy-MM-dd', 'en').toString());
  public date$: Observable<string> = this._dateSubject.asObservable();

  constructor(
    @Inject(GET_ALL_TASK_BY_EMPLOYEE_DTO_PORT)
    private _getAllTaskByEmployee: GetAllTaskByEmployeeDtoPort,
    @Inject(DONE_TASK_UPDATE_COMMAND_PORT)
    private _doneTaskUpdateCommandPort: DoneTaskUpdateCommandPort
  ) {
    this.employeeTaskList$.subscribe(
      (task) => (this.dataSourceTask.data = task)
    );

    console.log(formatDate(new Date(), 'yyyy-MM-dd', 'en'))
  }

  rowName = ['name', 'executionTime', 'done', 'update'];
  dataSourceTask = new MatTableDataSource<TaskQuery>();

  readonly employeeTaskList$: Observable<TaskQuery[]> = combineLatest([
    this._getAllTaskByEmployee.getAllTaskByEmployee(
      Number(localStorage.getItem('individualId'))
    ),
    this.done$,
    this.date$
  ]).pipe(
    map(([taskList, done,date]: [TaskQuery[], boolean,string]) => {
      return taskList.filter((task) => task.done === done).filter(task => task.executionTime.toString()===date);
    })
  );
  isChecked: boolean = false;

  updateDone(task: TaskQuery) {
    this._doneTaskUpdateCommandPort
      .done(
        new DoneTaskCommand(
          task.id,
          task.name,
          true,
          task.executionTime,
          task.employee
        )
      )
      .pipe(take(1))
      .subscribe(() => window.location.reload());

    this.employeeTaskList$.subscribe(
      (task) => (this.dataSourceTask.data = task)
    );
  }

  toggle($event: MatSlideToggleChange) {
    this._doneSubject.next($event.checked);
    this.employeeTaskList$.subscribe(
      (task) => (this.dataSourceTask.data = task)
    );
    // console.log($event.checked)
  }

  addEvent(input: string, $event: MatDatepickerInputEvent<any>) {
    var datePipe = new DatePipe("en-US");
    console.log(datePipe.transform($event.value.toString(), 'yyyy/MM/dd'))
    this._dateSubject.next(<string>datePipe.transform($event.value.toString(), 'yyyy-MM-dd'))
  }
}
