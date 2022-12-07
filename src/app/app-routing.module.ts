import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginPageModule } from './pages/login.page-module';
import { AuthenticationGuard } from './authentication.guard';
import { OrderListPageModule } from './pages/order-list/order-list.page-module';
import { NewOrderPageModule } from './pages/new-order/new-order.page-module';
import { OrderDetailsPageModule } from './pages/order-details/order-details.page-module';
import { HomePageModule } from './pages/home/home.page-module';
import { AddTaskPageModule } from './pages/add-task/add-task.page-module';
import { EmployeePageModule } from './pages/employee/employee.page-module';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', loadChildren: () => HomePageModule },
      { path: 'login', loadChildren: () => LoginPageModule },
      { path: 'orders', loadChildren: () => OrderListPageModule },
      { path: 'new-order', loadChildren: () => NewOrderPageModule },
      { path: 'task', loadChildren: () => AddTaskPageModule },
      { path: 'order/:id', loadChildren: () => OrderDetailsPageModule },
      { path: 'employee', loadChildren: () => EmployeePageModule },

      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
