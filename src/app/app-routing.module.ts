import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AdminPanelComponentModule } from './components/admin-panel/admin-panel.component-module';
import { LoginPageModule } from './pages/login.page-module';
import { AuthenticationGuard } from './authentication.guard';
import { OrderListPageModule } from './pages/order-list/order-list.page-module';
import { NewOrderPageModule } from './pages/new-order/new-order.page-module';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthenticationGuard],
    data: {
      role: 'ADMIN',
    },
    children: [
      { path: 'login', loadChildren: () => LoginPageModule },
      {
        path: '',
        component: AdminPanelComponent,
      },
      { path: 'orders', loadChildren: () => OrderListPageModule },
      { path: 'new-order', loadChildren: () => NewOrderPageModule },

      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    AdminPanelComponentModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
