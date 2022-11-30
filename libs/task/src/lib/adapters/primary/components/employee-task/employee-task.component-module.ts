import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeTaskComponent } from './employee-task.component';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatSlideToggleModule,
  ],
  declarations: [EmployeeTaskComponent],
  providers: [],
  exports: [EmployeeTaskComponent],
})
export class EmployeeTaskComponentModule {}
