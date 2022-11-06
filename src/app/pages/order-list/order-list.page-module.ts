import { NgModule } from '@angular/core';
import { OrderListPage } from './order-list.page';
import {
  HttpClientServiceModule, HttpEmployeeServiceModule,
  InMemoryClientStorageModule, InMemoryNewOrderStorageModule, LoadAllEmployeesResolverModule,
  LoadOrdersResolver,
  LoadOrdersResolverModule,
  OrderListComponentModule,
  OrderServiceModule,
  OrderStateModule,
  OrderStorageModule,
} from '@order';
import { RouterModule } from '@angular/router';
import { NavigationComponentModule } from '@navigation';
import {HttpClientService} from "../../../../libs/order/src/lib/adapters/secondary/services/http-client.service";
import {RequestInterceptor} from "../../request.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

@NgModule({
  imports: [
    OrderListComponentModule,
    OrderServiceModule,
    NavigationComponentModule,
    LoadOrdersResolverModule,
    OrderStorageModule,
    OrderStateModule,
    InMemoryClientStorageModule,
    LoadAllEmployeesResolverModule,
    HttpEmployeeServiceModule,
    InMemoryNewOrderStorageModule,
    HttpClientServiceModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrderListPage,
        resolve: [LoadOrdersResolver],
      },
    ]),
  ],
  declarations: [OrderListPage],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true}],
  exports: [OrderListPage],
})
export class OrderListPageModule {}
