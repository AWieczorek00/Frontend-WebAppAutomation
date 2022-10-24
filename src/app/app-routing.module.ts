import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TestComponent } from './components/test/test.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { TestComponentModule } from './components/test/test.component-module';
import { AdminPanelComponentModule } from './components/admin-panel/admin-panel.component-module';
import { LoginPageModule } from './pages/login.page-module';
import { AuthenticationGuard } from './authentication.guard';
import * as path from 'path';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthenticationGuard],
    data:{
      role:'ADMIN'
    },
    children: [
      { path: 'login', loadChildren: () => LoginPageModule },
      {
        path: '',
        component: AdminPanelComponent,
      },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    TestComponentModule,
    AdminPanelComponentModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
