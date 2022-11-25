import { NgModule } from '@angular/core';
import { HomePage } from './home.page';
import { RouterModule } from '@angular/router';
import {
  HttpEmployeeServiceModule, HttpTaskServiceModule,
  InMemoryTaskStorageModule,
  LoadEmployeeResolver,
  LoadEmployeeResolverModule,
  TaskStateModule,
  TaskToEmployeeComponentModule,
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
        // resolve: [LoadEmployeeResolver],
      },
    ]),
    LoadEmployeeResolverModule,
    NavigationComponentModule,
    TaskToEmployeeComponentModule,
    HttpEmployeeServiceModule,
    InMemoryTaskStorageModule,
    TaskStateModule,
    HttpTaskServiceModule

  ],
  declarations: [HomePage],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
  exports: [HomePage],
})
export class HomePageModule {}