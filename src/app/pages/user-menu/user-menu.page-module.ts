import { NgModule } from '@angular/core';
import { UserMenuPage } from './user-menu.page';
import {CommonModule} from "@angular/common";
import {NavigationComponentModule} from "@navigation";

@NgModule({
  imports: [CommonModule,NavigationComponentModule],
  declarations: [UserMenuPage],
  providers: [],
  exports: [UserMenuPage]
})
export class UserMenuPageModule {
}
