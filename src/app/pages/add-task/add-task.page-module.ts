import { NgModule } from '@angular/core';
import { AddTaskPage } from './add-task.page';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from '../../request.interceptor';
import {
  AddTaskComponentModule,
  HttpEmployeeServiceModule,
  HttpTaskServiceModule,
  InMemoryEmployeeStorageModule,
  InMemoryTaskStorageModule,
  LoadEmployeeResolver,
  LoadEmployeeResolverModule,
  LoadTaskResolver,
  LoadTaskResolverModule,
  TaskListComponentModule,
  TaskStateModule,
} from '@task';
import { NavigationComponentModule } from '@navigation';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AddTaskPage,
        resolve: [LoadEmployeeResolver, LoadTaskResolver],
      },
    ]),
    LoadEmployeeResolverModule,
    NavigationComponentModule,
    AddTaskComponentModule,
    HttpEmployeeServiceModule,
    InMemoryTaskStorageModule,
    TaskStateModule,
    HttpTaskServiceModule,
    InMemoryEmployeeStorageModule,
    LoadTaskResolverModule,
    TaskListComponentModule,
  ],
  declarations: [AddTaskPage],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
  exports: [AddTaskPage],
})
export class AddTaskPageModule {}
