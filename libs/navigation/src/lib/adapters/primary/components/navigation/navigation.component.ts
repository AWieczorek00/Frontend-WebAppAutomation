import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../../../../../../../task/src/lib/adapters/primary/components/add-task/add-task.component';
import { SmallWindowsMenuComponent } from '../small-windows-menu/small-windows-menu.component';
import {auto} from "@popperjs/core";

@Component({
  selector: 'lib-navigation',
  styleUrls: ['./navigation.component.scss'],
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NavigationComponent {
  roles: string | null;
  constructor(private _router: Router, public dialog: MatDialog) {
    this.roles = localStorage.getItem('roles');
    this.getScreenSize();
  }

  screenHeight: number = 0;
  screenWidth: number = 0;

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    console.log(this.screenHeight, this.screenWidth);
  }

  logout() {
    localStorage.clear();
    this._router.navigate(['/login']);
  }

  open() {
    this.dialog.open(SmallWindowsMenuComponent, {
      height: '100%',
      position: {right:'0px'}
    });
  }
}
