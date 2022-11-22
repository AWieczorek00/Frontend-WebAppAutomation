import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, map, Observable, startWith} from 'rxjs';
import { OrderQuery } from '../../../../application/ports/primary/query/order.query';
import {
  GET_ONE_ORDER_DTO_PORT,
  GetOneOrderDtoPort,
} from '../../../../application/ports/secondary/dto/order/get-one-order.dto-port';
import { switchMap } from 'rxjs/operators';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivitiesQuery } from '../../../../application/ports/primary/query/activities.query';
import {EmployeeQuery} from "../../../../application/ports/primary/query/employee.query";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {ClientQuery} from "../../../../application/ports/primary/query/client.query";
import {PartsTemplateQuery} from "../../../../application/ports/primary/query/parts-template/parts-template.query";
import {
  ActivitiesTemplateDto
} from "../../../../application/ports/secondary/dto/activitiesTemplate/activities-template.dto";
import {PartQuery} from "../../../../application/ports/primary/query/part/partQuery";
import {
  ActivitiesTemplateQuery
} from "../../../../application/ports/primary/query/activities-template/activities-template.query";
import {
  GETS_NEW_ORDER_CURRENCY_ELEMENTS_QUERY_PORT,
  GetsNewOrderCurrencyElementsQueryPort
} from "../../../../application/ports/primary/query/gets-new-order-currency-elements.query-port";
import {NewOrderQuery} from "../../../../application/ports/primary/query/new-order.query";

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
    private _getOneOrderDtoPort: GetOneOrderDtoPort,
    @Inject(GETS_NEW_ORDER_CURRENCY_ELEMENTS_QUERY_PORT)
    private _getsNewOrderCurrencyElementsQueryPort: GetsNewOrderCurrencyElementsQueryPort,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {


    this.elements$.subscribe(
      (employee) => (this.employeeListAutocomplete = employee.employeeList)
    );
    this.elements$.subscribe(
      (data) => (this.clientListAutocomplete = data.clientList)
    );
    this.elements$.subscribe(
      (data) => (this.partsTemplateListAutocomplete = data.partsTemplateList)
    );
    this.elements$.subscribe(
      (data) =>
        (this.activitiesTemplateListAutocomplete = data.activitiesTemplateList)
    );


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
        activitiesList: order.activitiesList,
        partList: order.partList,
      })
    );
    // this.order$.subscribe(
    //   (order) => (this.activitiesTemplateListAutocomplete = order.activitiesList)
    // );
    // this.order$.subscribe(
    //   (order) => (this.employeeListAutocomplete = order.employeeList)
    // );

    this.filteredClient = this.order.valueChanges.pipe(
      startWith({} as ClientQuery),
      map((client) =>
        client && typeof client === 'object' ? client.name : client
      ),
      map((name: string) =>
        name ? this._filterClient(name) : this.clientListAutocomplete.slice()
      )
    );

    this.filteredEmployee = this.employeeControl.valueChanges.pipe(
      startWith({} as EmployeeQuery),
      map((employee) =>
        employee && typeof employee === 'object' ? employee.firstName : employee
      ),
      map((firstName: string) =>
        firstName
          ? this._filterEmployee(firstName)
          : this.employeeListAutocomplete.slice()
      )
    );

    this.filteredActivitiesTemplate =
      this.activitiesTemplateControl.valueChanges.pipe(
        startWith({} as ActivitiesTemplateQuery),
        map((activitiesTemplate) =>
          activitiesTemplate && typeof activitiesTemplate === 'object'
            ? activitiesTemplate.name
            : activitiesTemplate
        ),
        map((name: string) =>
          name
            ? this._filterActivitiesTemplate(name)
            : this.activitiesTemplateListAutocomplete.slice()
        )
      );

    this.filteredPartsTemplate = this.partsTemplateControl.valueChanges.pipe(
      startWith({} as PartsTemplateQuery),
      map((partsTemplate) =>
        partsTemplate && typeof partsTemplate === 'object'
          ? partsTemplate.name
          : partsTemplate
      ),
      map((name: string) =>
        name
          ? this._filterPartsTemplate(name)
          : this.partsTemplateListAutocomplete.slice()
      )
    );

  }

  readonly order$: Observable<OrderQuery> = this._activatedRoute.params.pipe(
    switchMap((data) => this._getOneOrderDtoPort.getOneOrder(data['id']))
  );

  readonly elements$: Observable<NewOrderQuery> =
    this._getsNewOrderCurrencyElementsQueryPort.getNewOrderCurrencyElements();


  activitiesList: ActivitiesQuery[] = [];
  nameRowActivities: string[] = ['name', 'attention', 'done'];
  nameRowEmployee: string[] = ['firstName', 'secondName', 'lastName'];
  nameRowParts = ['name', 'price', 'amount'];
  clientControl = new FormControl('');
  employeeControl = new FormControl('');
  activitiesTemplateControl = new FormControl('');
  partsTemplateControl = new FormControl('');
  clientListAutocomplete: ClientQuery[] = [];
  employeeListAutocomplete: EmployeeQuery[] = [];
  partsTemplateListAutocomplete!: PartsTemplateQuery[];
  activitiesTemplateListAutocomplete: ActivitiesTemplateDto[] = [];
  filteredClient: Observable<ClientQuery[]> | undefined;
  filteredEmployee: Observable<EmployeeQuery[]> | undefined;
  filteredActivitiesTemplate: Observable<ActivitiesTemplateDto[]> | undefined;
  filteredPartsTemplate: Observable<PartsTemplateQuery[]> | undefined;
  employee: EmployeeQuery | undefined;
  activities: ActivitiesQuery | undefined;
  part: PartQuery | undefined;
  dataSourceEmployee = new MatTableDataSource<EmployeeQuery>();
  behaviorActivities = new BehaviorSubject<AbstractControl[]>([]);
  behaviorParts = new BehaviorSubject<AbstractControl[]>([]);

  activitiesRows: FormArray = this._formBuilder.array([]);
  partRows: FormArray = this._formBuilder.array([]);


  employeeList: EmployeeQuery[] = [];
  readonly order: FormGroup = new FormGroup({
    name: new FormControl(['', Validators.required]),
    nip: new FormControl(),
    phoneNumber: new FormControl(['']),
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
    activitiesList: this.activitiesRows,
    partList: this.partRows,
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
        activitiesList:order.get('activitiesList')?.value,
        partList:order.get('partList')?.value
      })
    }
  }

  //------------------------------Autocomplete client------------------------------

  getClient(value: any) {
    this.order.patchValue({
      nip: value.nip,
      phoneNumber: value.phoneNumber,
      zipcode: value.zipcode,
      street: value.address,
      apartmentNumber: value.apartmentNumber,
      streetNumber: value.streetNumber,
      city: value.city,
      email: value.email,
    });
  }

  getOptionClient(clientQueries: ClientQuery) {
    return clientQueries.name;
  }

  _filterClient(name: string): ClientQuery[] {
    return this.clientListAutocomplete.filter(
      (option) => option.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }

  //------------------------------Autocomplete Employee------------------------------

  getEmployee(employee: EmployeeQuery) {
    this.employee = employee;
  }

  getOptionEmployee(employeeQueries: EmployeeQuery) {
    if (employeeQueries.lastName) {
      return employeeQueries.firstName + ' ' + employeeQueries.lastName;
    }
    return '';
  }

  _filterEmployee(firstName: string): EmployeeQuery[] {
    return this.employeeListAutocomplete.filter(
      (option) =>
        option.firstName.toLowerCase().indexOf(firstName.toLowerCase()) === 0
    );
  }

  addEmployee() {
    if (this.employee) {
      console.log(this.employee)
      this.employeeList.push(this.employee);

      this.dataSourceEmployee = new MatTableDataSource<EmployeeQuery>(
        this.employeeList
      );
    }
  }

  //------------------------------Autocomplete Activities------------------------------

  getActivitiesTemplate(activitiesTemplate: ActivitiesTemplateQuery) {
    this.activities = {
      id: NaN,
      name: activitiesTemplate.name,
      attention: '',
      done: true,
    };
  }

  getOptionActivitiesTemplate(
    activitiesTemplateQuery: ActivitiesTemplateQuery
  ) {
    return activitiesTemplateQuery.name;
  }

  addActivities() {
    const row = this._formBuilder.group({
      name: this.activities?.name,
      attention: '',
      done: true,
    });


    this.activitiesRows.push(row);
    this.updateActivitiesView();


  }

  _filterActivitiesTemplate(name: string): ActivitiesTemplateQuery[] {
    return this.activitiesTemplateListAutocomplete.filter(
      (option) => option.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }

  //------------------------------Autocomplete Part------------------------------

  getOptionPartsTemplate(partsTemplateQuery: PartsTemplateQuery) {
    console.log(partsTemplateQuery.name);
    return partsTemplateQuery.name;
  }

  getPartsTemplate(partsTemplate: PartsTemplateQuery) {
    this.part = {
      id: NaN,
      name: partsTemplate.name,
      price: partsTemplate.price,
      amount: 0,
    };
    console.log(this.part);
  }

  addPart() {
    const row = this._formBuilder.group({
      name: this.part?.name,
      price: this.part?.price,
      amount: 0,
    });
    this.partRows.push(row);
    this.updatePartsView();
  }

  _filterPartsTemplate(name: string): PartsTemplateQuery[] {
    return this.partsTemplateListAutocomplete.filter(
      (option) => option.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }

  data = [];

  private updateActivitiesView() {
    this.behaviorActivities.next(this.activitiesRows.controls);
  }


  private updatePartsView() {
    this.behaviorParts.next(this.partRows.controls);
  }

}
