import { NgModule } from '@angular/core';
import { TaskListComponent } from './task-list.component';
import {MatTableModule} from "@angular/material/table";
import {CommonModule} from "@angular/common";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  imports: [
    MatTableModule,
    CommonModule,
    NgbDropdownModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [TaskListComponent],
  providers: [],
  exports: [TaskListComponent],
})
export class TaskListComponentModule {}
