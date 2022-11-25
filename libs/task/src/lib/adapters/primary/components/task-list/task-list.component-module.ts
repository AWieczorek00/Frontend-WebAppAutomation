import { NgModule } from '@angular/core';
import { TaskListComponent } from './task-list.component';
import {MatTableModule} from "@angular/material/table";

@NgModule({
  imports: [MatTableModule],
  declarations: [TaskListComponent],
  providers: [],
  exports: [TaskListComponent],
})
export class TaskListComponentModule {}
