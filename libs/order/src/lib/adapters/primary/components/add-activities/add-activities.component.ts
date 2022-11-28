import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";
import {
  AddTaskComponent
} from "../../../../../../../task/src/lib/adapters/primary/components/add-task/add-task.component";

@Component({
  selector: 'lib-add-activities',
  styleUrls: ['./add-activities.component.scss'],
  templateUrl: './add-activities.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddActivitiesComponent {
  constructor(    public dialogRef: MatDialogRef<AddActivitiesComponent>,
  ) {
  }
  readonly addActivities: FormGroup = new FormGroup({ name: new FormControl() });

  onAddActivitiesSubmitted(addActivities: FormGroup): void {
    this.dialogRef.close()
  }

  close() {
    this.dialogRef.close()

  }
}
