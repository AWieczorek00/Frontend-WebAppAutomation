import { NgModule } from '@angular/core';
import { OrderDetailsPage } from './order-details.page';
import { NavigationComponentModule } from '@navigation';
import {
  HttpActivitiesTemplateServiceModule,
  HttpClientServiceModule,
  HttpEmployeeServiceModule,
  HttpPartsTemplateServiceModule,
  InMemoryClientStorageModule,
  InMemoryNewOrderStorageModule,
  LoadAllActivitiesTemplateResolver,
  LoadAllActivitiesTemplateResolverModule,
  LoadAllClientsResolver,
  LoadAllClientsResolverModule,
  LoadAllEmployeesResolver,
  LoadAllEmployeesResolverModule, LoadAllPartsTemplateResolver,
  LoadAllPartsTemplateResolverModule,
  NewOrderComponentModule,
  OrderDetailsComponentModule,
  OrderServiceModule,
  OrderStateModule,
  OrderStorageModule
} from '@order';
import { RouterModule } from '@angular/router';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {RequestInterceptor} from "../../request.interceptor";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: OrderDetailsPage,
        resolve: [LoadAllClientsResolver,LoadAllEmployeesResolver,LoadAllActivitiesTemplateResolver,LoadAllPartsTemplateResolver],
      },
    ]),
    NavigationComponentModule,
    OrderDetailsComponentModule,
    OrderServiceModule,
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
    HttpActivitiesTemplateServiceModule,
    HttpPartsTemplateServiceModule,
    LoadAllPartsTemplateResolverModule,
    MatSnackBarModule
  ],
  declarations: [OrderDetailsPage],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },],
  exports: [OrderDetailsPage],
})
export class OrderDetailsPageModule {}
