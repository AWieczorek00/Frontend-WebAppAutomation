import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { UpdateEmployeeComponent } from './update-employee.component';

@NgModule({
  imports: [MatInputModule, ReactiveFormsModule, CommonModule],
  declarations: [UpdateEmployeeComponent],
  providers: [],
  exports: [UpdateEmployeeComponent],
})
export class UpdateEmployeeComponentModule { }
