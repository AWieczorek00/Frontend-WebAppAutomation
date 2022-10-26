import { NgModule } from '@angular/core';
import { OrderListPage } from './order-list.page';
import {
  LoadOrdersResolver,
  LoadOrdersResolverModule,
  OrderListComponentModule,
  OrderServiceModule,
  OrderStateModule,
  OrderStorageModule,
} from '@order';
import { RouterModule } from '@angular/router';
import { NavigationComponentModule } from '@navigation';

@NgModule({
  imports: [
    OrderListComponentModule,
    OrderServiceModule,
    NavigationComponentModule,
    LoadOrdersResolverModule,
    OrderStorageModule,
    OrderStateModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrderListPage,
        resolve: [LoadOrdersResolver],
      },
    ]),
  ],
  declarations: [OrderListPage],
  providers: [],
  exports: [OrderListPage],
})
export class OrderListPageModule {}
