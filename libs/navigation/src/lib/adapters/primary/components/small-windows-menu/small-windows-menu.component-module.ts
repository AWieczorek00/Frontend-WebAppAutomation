import { NgModule } from '@angular/core';
import { SmallWindowsMenuComponent } from './small-windows-menu.component';
import {MatDialogModule} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [MatDialogModule, CommonModule],
  declarations: [SmallWindowsMenuComponent],
  providers: [],
  exports: [SmallWindowsMenuComponent],
})
export class SmallWindowsMenuComponentModule {}
