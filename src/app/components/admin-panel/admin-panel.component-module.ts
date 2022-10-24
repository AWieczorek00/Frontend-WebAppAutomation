import { NgModule } from '@angular/core';
import { AdminPanelComponent } from './admin-panel.component';
import {NavigationComponentModule} from "@navigation";

@NgModule({
  imports: [NavigationComponentModule],
  declarations: [AdminPanelComponent],
  providers: [],
  exports: [AdminPanelComponent]
})
export class AdminPanelComponentModule {
}
