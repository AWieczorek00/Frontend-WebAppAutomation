import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderQuery } from '../../../../application/ports/primary/query/order.query';
import {
  GET_ONE_ORDER_DTO_PORT,
  GetOneOrderDtoPort,
} from '../../../../application/ports/secondary/dto/order/get-one-order.dto-port';
import { switchMap } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivitiesQuery } from '../../../../application/ports/primary/query/activities.query';
import {EmployeeQuery} from "../../../../application/ports/primary/query/employee.query";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: 'lib-order-details',
  styleUrls: ['./order-details.component.scss'],
  templateUrl: './order-details.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailsComponent {
  constructor(
    private _activatedRoute: ActivatedRoute,
    @Inject(GET_ONE_ORDER_DTO_PORT)
    private _getOneOrderDtoPort: GetOneOrderDtoPort
  ) {
    this.order$.subscribe(
      (order) => (this.activitiesList = order.activitiesList)
    );
    console.log(this.activitiesList);
    this.order$.subscribe((order: OrderQuery) =>
      this.order.setValue({
        name: order.client.name,
        nip: order.client.nip,
        phoneNumber: order.client.phoneNumber,
        status: order.status,
        priority: order.priority,
        dateOfAdmission: order.dateOfAdmission,
        dateOfExecution: order.dateOfExecution,
        period: order.period,
        street: order.client.address,
        city: order.client.city,
        streetNumber: order.client.streetNumber,
        apartmentNumber: order.client.apartmentNumber,
        zipcode: order.client.zipcode,
        email: order.client.email,
        note: order.note,
      })
    );
    this.order$.subscribe(
      (order) => (this.activitiesList = order.activitiesList)
    );
    this.order$.subscribe(
      (order) => (this.employeeList = order.employeeList)
    );
    console.log(this.activitiesList);
  }

  readonly order$: Observable<OrderQuery> = this._activatedRoute.params.pipe(
    switchMap((data) => this._getOneOrderDtoPort.getOneOrder(data['id']))
  );

  activitiesList: ActivitiesQuery[] = [];
  // dataSourceActivities = new MatTableDataSource<ActivitiesQuery>(
  //   this.activitiesList
  // );
  nameRowActivities: string[] = ['name', 'attention', 'done'];

  nameRowEmployee: string[] = ['firstName', 'secondName', 'lastName'];
  employeeList: EmployeeQuery[] = [];

  readonly order: FormGroup = new FormGroup({
    name: new FormControl(),
    nip: new FormControl(),
    phoneNumber: new FormControl(),
    status: new FormControl(),
    priority: new FormControl(),
    dateOfAdmission: new FormControl(),
    dateOfExecution: new FormControl(),
    period: new FormControl(),
    street: new FormControl(),
    city: new FormControl(),
    streetNumber: new FormControl(),
    apartmentNumber: new FormControl(),
    zipcode: new FormControl(),
    email: new FormControl(),
    note: new FormControl(),
  });



  setSummary($event: MatTabChangeEvent,order: FormGroup) {
    if($event.index===4){
      this.order.setValue({
        name: order.get("name")?.value,
        nip: order.get("nip")?.value,
        phoneNumber: order.get("phoneNumber")?.value,
        status: order.get("status")?.value,
        priority: order.get("priority")?.value,
        dateOfAdmission: order.get("dateOfAdmission")?.value,
        dateOfExecution: order.get("dateOfExecution")?.value,
        period: order.get("period")?.value,
        street: order.get("street")?.value,
        city: order.get("city")?.value,
        streetNumber: order.get("streetNumber")?.value,
        apartmentNumber: order.get("apartmentNumber")?.value,
        zipcode: order.get("zipcode")?.value,
        email: order.get("email")?.value,
        note: order.get("note")?.value,
      })
    }
  }
}
