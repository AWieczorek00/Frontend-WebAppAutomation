import { NgModule } from '@angular/core';
import { OrderListPage } from './order-list.page';
import {
  HttpActivitiesTemplateServiceModule,
  HttpClientServiceModule,
  HttpEmployeeServiceModule, HttpPartsTemplateServiceModule,
  InMemoryClientStorageModule,
  InMemoryNewOrderStorageModule, LoadAllEmployeesResolver,
  LoadAllEmployeesResolverModule, LoadAllPartsTemplateResolver, LoadAllPartsTemplateResolverModule,
  LoadOrdersResolver,
  LoadOrdersResolverModule,
  OrderListComponentModule,
  OrderServiceModule,
  OrderStateModule,
  OrderStorageModule,
} from '@order';
import { RouterModule } from '@angular/router';
import { NavigationComponentModule } from '@navigation';
import { RequestInterceptor } from '../../request.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpPartsTemplateService
} from "../../../../libs/order/src/lib/adapters/secondary/services/http-parts-template.service";
import {BrowserModule} from "@angular/platform-browser";

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
    HttpActivitiesTemplateServiceModule,
    HttpPartsTemplateServiceModule,

    RouterModule.forChild([
      {
        path: '',
        component: OrderListPage,
        resolve: [LoadOrdersResolver,LoadAllEmployeesResolver],
      },
    ]),
  ],
  declarations: [OrderListPage],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
  exports: [OrderListPage],
})
export class OrderListPageModule {}
