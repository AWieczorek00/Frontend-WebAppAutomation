import { NgModule } from '@angular/core';
import { TestPage } from './test.page';
import { RouterModule } from '@angular/router';
import { TestComponentModule } from '@order';
import { NavigationComponentModule } from '@navigation';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: TestPage,
      },
    ]),
    NavigationComponentModule,
    TestComponentModule,
  ],
  declarations: [TestPage],
  providers: [],
  exports: [TestPage],
})
export class TestPageModule {}
