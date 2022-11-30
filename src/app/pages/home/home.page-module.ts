import { NgModule } from '@angular/core';
import { HomePage } from './home.page';
import { RouterModule } from '@angular/router';
import {
  EmployeeTaskComponentModule,
  HttpEmployeeServiceModule, HttpTaskServiceModule, InMemoryEmployeeStorageModule,
  InMemoryTaskStorageModule,
  LoadEmployeeResolverModule,
  TaskStateModule,
} from '@task';
import { NavigationComponentModule } from '@navigation';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from '../../request.interceptor';
import {
  HttpActivitiesTemplateServiceModule,
  HttpClientServiceModule, HttpPartsTemplateServiceModule,
  InMemoryClientStorageModule, InMemoryNewOrderStorageModule, LoadAllEmployeesResolverModule,
  LoadOrdersResolverModule,
  OrderListComponentModule,
  OrderServiceModule,
  OrderStateModule,
  OrderStorageModule
} from "@order";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
      },
    ]),
    LoadEmployeeResolverModule,
    NavigationComponentModule,
    HttpEmployeeServiceModule,
    InMemoryTaskStorageModule,
    TaskStateModule,
    HttpTaskServiceModule,
    EmployeeTaskComponentModule,
    InMemoryEmployeeStorageModule

  ],
  declarations: [HomePage],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
  exports: [HomePage],
})
export class HomePageModule {}
