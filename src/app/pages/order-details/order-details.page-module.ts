import { NgModule } from '@angular/core';
import { OrderDetailsPage } from './order-details.page';
import { NavigationComponentModule } from '@navigation';
import {OrderDetailsComponentModule, OrderServiceModule} from '@order';
import { RouterModule } from '@angular/router';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {RequestInterceptor} from "../../request.interceptor";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: OrderDetailsPage,
      },
    ]),
    NavigationComponentModule,
    OrderDetailsComponentModule,
    OrderServiceModule
  ],
  declarations: [OrderDetailsPage],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },],
  exports: [OrderDetailsPage],
})
export class OrderDetailsPageModule {}
