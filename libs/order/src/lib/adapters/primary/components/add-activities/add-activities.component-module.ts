import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddActivitiesComponent } from './add-activities.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  imports: [ReactiveFormsModule, MatDialogModule, MatInputModule],
  declarations: [AddActivitiesComponent],
  providers: [],
  exports: [AddActivitiesComponent]
})
export class AddActivitiesComponentModule {
}
