import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ADD_ACTIVITIES_TEMPLATE_COMMAND_PORT,
  AddActivitiesTemplateCommandPort,
} from '../../../../application/ports/primary/command/partsTemplate/add-activities-template.command-port';
import { MatDialogRef } from '@angular/material/dialog';
import { AddActivitiesTemplateCommand } from '../../../../application/ports/primary/command/activitiesTemplate/add-activities-template.command';
import { take } from 'rxjs/operators';

@Component({
  selector: 'lib-add-activities',
  styleUrls: ['./add-activities.component.scss'],
  templateUrl: './add-activities.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddActivitiesComponent {
  constructor(
    public dialogRef: MatDialogRef<AddActivitiesComponent>,
    @Inject(ADD_ACTIVITIES_TEMPLATE_COMMAND_PORT)
    private _addActivitiesTemplateCommandPort: AddActivitiesTemplateCommandPort
  ) {}

  readonly addActivities: FormGroup = new FormGroup({
    name: new FormControl(),
  });

  onAddActivitiesSubmitted(addActivities: FormGroup): void {
    this._addActivitiesTemplateCommandPort
      .add(new AddActivitiesTemplateCommand(addActivities.get('name')?.value))
      .pipe(take(1))
      .subscribe();
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
