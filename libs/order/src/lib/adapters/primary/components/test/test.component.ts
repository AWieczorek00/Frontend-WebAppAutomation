import {ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'lib-test',
  styleUrls: ['./test.component.scss'],
  templateUrl: './test.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent {
  // form!: FormGroup;
  //
  // private uid = 0;
  //
  // @ViewChild('table') table!: MatTable<any>;
  //
  // displayedColumns = ['name', 'attention'];
  // dataSource: MatTableDataSource<AbstractControl>;
  //
  // get productControlArray() {
  //   return this.form.get('products') as FormArray;
  // }
  //
  // constructor(private fb: FormBuilder) {
  //   this.createForm();
  //   this.addRow();
  //   this.dataSource = new MatTableDataSource(
  //     this.productControlArray.controls);
  // }
  //
  // createForm() {
  //   this.form = this.fb.group({
  //     products: this.fb.array([]),
  //   });
  // }
  //
  // trackRows(index: number, row: AbstractControl) {
  //   return row.value.uid;
  // }
  //
  // private addRow() {
  //   const rows = this.productControlArray;
  //   rows.push(
  //     this.fb.group({
  //       uid: this.nextUid(),
  //       name: ['Test', Validators.required],
  //       attention: [0, Validators.required]
  //     })
  //   );
  // }
  //
  // createRow() {
  //   this.addRow();
  //   this.table.renderRows();
  // }
  //
  // private nextUid() {
  //   ++this.uid
  //   return this.uid;
  // }
  data = [];
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  displayColumns = ['name', 'attention','done'];
  rows: FormArray = this.fb.array([]);
  form: FormGroup = this.fb.group({
    activities: this.rows,
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.data.forEach(() => this.addRow());
    this.updateView();
  }

  emptyTable() {
    while (this.rows.length !== 0) {
      this.rows.removeAt(0);
    }
  }

  addRow() {
    const row = this.fb.group({
      name: '',
      attention: 30,
      done:true
    });
    this.rows.push(row);
    this.updateView();
    console.log(this.rows.get('attention')?.value)
  }

  updateView() {
    this.dataSource.next(this.rows.controls);
  }
}
