import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lib-task-to-employee',
  styleUrls: ['./task-to-employee.component.scss'],
  templateUrl: './task-to-employee.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskToEmployeeComponent {
}
