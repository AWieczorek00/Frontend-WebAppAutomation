import { NgModule } from '@angular/core';
import { NewOrderPage } from './new-order.page';
import { RouterModule } from '@angular/router';
import {
  HttpActivitiesTemplateServiceModule,
  HttpClientServiceModule,
  HttpEmployeeServiceModule,
  InMemoryClientStorageModule,
  InMemoryNewOrderStorageModule,
  LoadAllActivitiesTemplateResolver,
  LoadAllActivitiesTemplateResolverModule,
  LoadAllClientsResolver,
  LoadAllClientsResolverModule,
  LoadAllEmployeesResolver,
  LoadAllEmployeesResolverModule,
  NewOrderComponentModule,
  OrderServiceModule,
  OrderStateModule,
  OrderStorageModule,
} from '@order';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from '../../request.interceptor';
import {NavigationComponentModule} from "@navigation";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: NewOrderPage,
        resolve: [LoadAllClientsResolver,LoadAllEmployeesResolver,LoadAllActivitiesTemplateResolver],
      },
    ]),
    NavigationComponentModule,
    NewOrderComponentModule,
    InMemoryClientStorageModule,
    HttpClientServiceModule,
    LoadAllClientsResolverModule,
    OrderStateModule,
    OrderServiceModule,
    OrderStorageModule,
    LoadAllEmployeesResolverModule,
    HttpEmployeeServiceModule,
    InMemoryNewOrderStorageModule,
    LoadAllActivitiesTemplateResolverModule,
    HttpActivitiesTemplateServiceModule
  ],
  declarations: [NewOrderPage],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
  exports: [NewOrderPage],
})
export class NewOrderPageModule {}
