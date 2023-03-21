import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lib-small-windows-menu',
  styleUrls: ['./small-windows-menu.component.scss'],
  templateUrl: './small-windows-menu.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmallWindowsMenuComponent {
  roles: string | null;
  constructor(
    private _router: Router,
    public dialogRef: MatDialogRef<SmallWindowsMenuComponent>
  ) {
    this.roles = localStorage.getItem('roles');
    console.log(this.roles)
  }
}
