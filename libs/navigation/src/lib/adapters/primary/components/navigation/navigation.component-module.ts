import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation.component';
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [CommonModule],
  declarations: [NavigationComponent],
  providers: [],
  exports: [NavigationComponent]
})
export class NavigationComponentModule {
}
