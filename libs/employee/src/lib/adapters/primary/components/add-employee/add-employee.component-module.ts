import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEmployeeComponent } from './add-employee.component';
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  imports: [ReactiveFormsModule, MatInputModule, MatIconModule,MatFormFieldModule],
  declarations: [AddEmployeeComponent],
  providers: [],
  exports: [AddEmployeeComponent],
})
export class AddEmployeeComponentModule {}
