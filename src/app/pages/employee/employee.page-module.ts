import { NgModule } from '@angular/core';
import { EmployeePage } from './employee.page';
import {RouterModule} from "@angular/router";

import {NavigationComponentModule} from "@navigation";
import {
  AddEmployeeComponentModule,
  EmployeeListComponentModule, EmployeeStateModule,
  HttpEmployeeServiceModule, InMemoryEmployeeStorageModule, LoadEmployeesResolver, LoadEmployeesResolverModule

} from "@employee";
import {MatFormFieldModule} from "@angular/material/form-field";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {RequestInterceptor} from "../../request.interceptor";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: EmployeePage,
        resolve: [LoadEmployeesResolver],
      },
    ]),
    NavigationComponentModule,
    EmployeeListComponentModule,
    LoadEmployeesResolverModule,
    HttpEmployeeServiceModule,
    InMemoryEmployeeStorageModule,
    AddEmployeeComponentModule,
    MatFormFieldModule,
    MatDialogModule,
    EmployeeStateModule,
  ],
  declarations: [EmployeePage],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
  exports: [EmployeePage],
})
export class EmployeePageModule {}
