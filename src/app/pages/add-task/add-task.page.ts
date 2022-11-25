import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-add-task-page',
  styleUrls: ['./add-task.page.scss'],
  templateUrl: './add-task.page.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTaskPage {
}
