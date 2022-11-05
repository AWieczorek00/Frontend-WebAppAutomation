import { NgModule } from '@angular/core';
import { NewOrderPage } from './new-order.page';
import { RouterModule } from '@angular/router';
import {
  HttpClientServiceModule,
  InMemoryClientStorageModule,
  LoadAllClientsResolver,
  LoadAllClientsResolverModule,
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
        resolve: [LoadAllClientsResolver],
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
  ],
  declarations: [NewOrderPage],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
  exports: [NewOrderPage],
})
export class NewOrderPageModule {}
