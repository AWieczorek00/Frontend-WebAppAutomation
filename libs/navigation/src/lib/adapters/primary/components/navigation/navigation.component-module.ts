import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation.component';
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [CommonModule,NgbModule],
  declarations: [NavigationComponent],
  providers: [],
  exports: [NavigationComponent]
})
export class NavigationComponentModule {
}
