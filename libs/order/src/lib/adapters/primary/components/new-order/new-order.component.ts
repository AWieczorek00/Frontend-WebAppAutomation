import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, take } from 'rxjs/operators';
import { BehaviorSubject, Observable, map, startWith } from 'rxjs';
import { Router } from '@angular/router';
import { GETS_NEW_ORDER_CURRENCY_ELEMENTS_QUERY_PORT, GetsNewOrderCurrencyElementsQueryPort } from '../../../../application/ports/primary/query/gets-new-order-currency-elements.query-port';
import { CREATE_ORDER_COMMAND_PORT, CreateOrderCommandPort } from '../../../../application/ports/primary/command/order/create-order.command-port';
import { ClientQuery } from '../../../../application/ports/primary/query/client.query';
import { EmployeeQuery } from '../../../../application/ports/primary/query/employee.query';
import { ActivitiesTemplateQuery } from '../../../../application/ports/primary/query/activities-template/activities-template.query';
import { PartsTemplateQuery } from '../../../../application/ports/primary/query/parts-template/parts-template.query';
import { NewOrderQuery } from '../../../../application/ports/primary/query/new-order.query';
import { ActivitiesTemplateDto } from '../../../../application/ports/secondary/dto/activitiesTemplate/activities-template.dto';
import { ActivitiesQuery } from '../../../../application/ports/primary/query/activities.query';
import { PartQuery } from '../../../../application/ports/primary/query/part/partQuery';
import { CreateOrderCommand } from '../../../../application/ports/primary/command/order/create-order.command';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'lib-new-order',
  styleUrls: ['./new-order.component.scss'],
  templateUrl: './new-order.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewOrderComponent {
  constructor(
    @Inject(GETS_NEW_ORDER_CURRENCY_ELEMENTS_QUERY_PORT)
    private _getsNewOrderCurrencyElementsQueryPort: GetsNewOrderCurrencyElementsQueryPort,
    @Inject(CREATE_ORDER_COMMAND_PORT)
    private _createOrderCommandPort: CreateOrderCommandPort,
    private _formBuilder: FormBuilder, private _router: Router
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

  activitiesRows: FormArray = this._formBuilder.array([]);
  partRows: FormArray = this._formBuilder.array([]);

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

  // readonly attention: FormGroup = new FormGroup({
  //   attention: new FormControl(''),
  // });

  readonly elements$: Observable<NewOrderQuery> =
    this._getsNewOrderCurrencyElementsQueryPort.getNewOrderCurrencyElements();

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
  nameRowEmployee: string[] = ['firstName', 'secondName', 'lastName'];
  nameRowActivities = ['name', 'attention', 'done'];
  nameRowParts = ['name', 'price', 'amount'];
  employeeList: EmployeeQuery[] = [];

  // activitiesList: ActivitiesQuery[] = [];

  getOptionClient(clientQueries: ClientQuery) {
    return clientQueries.name;
  }

  getOptionEmployee(employeeQueries: EmployeeQuery) {
    if (employeeQueries.lastName) {
      return employeeQueries.firstName + ' ' + employeeQueries.lastName;
    }
    return '';
  }

  getOptionActivitiesTemplate(
    activitiesTemplateQuery: ActivitiesTemplateQuery
  ) {
    return activitiesTemplateQuery.name;
  }

  getOptionPartsTemplate(partsTemplateQuery: PartsTemplateQuery) {
    console.log(partsTemplateQuery.name);
    return partsTemplateQuery.name;
  }

  _filterClient(name: string): ClientQuery[] {
    return this.clientListAutocomplete.filter(
      (option) => option.name.toLowerCase().indexOf(name.toString().toLowerCase()) === 0
    );
  }

  _filterEmployee(firstName: string): EmployeeQuery[] {
    return this.employeeListAutocomplete.filter(
      (option) =>
        option.firstName.toLowerCase().indexOf(firstName.toLowerCase()) === 0
    );
  }

  _filterActivitiesTemplate(name: string): ActivitiesTemplateQuery[] {
    return this.activitiesTemplateListAutocomplete.filter(
      (option) => option.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }

  _filterPartsTemplate(name: string): PartsTemplateQuery[] {
    return this.partsTemplateListAutocomplete.filter(
      (option) => option.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }

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

  onOrderSubmitted(order: FormGroup): void {
    var client;

    if (typeof order.get('name')?.value === 'object') {
      client = order.get('name')?.value;
    } else {
      client = {
        id: NaN,
        name: order.get('name')?.value,
        nip: order.get('nip')?.value,
        address: order.get('street')?.value,
        city: order.get('city')?.value,
        zipcode: order.get('zipcode')?.value,
        apartmentNumber: order.get('apartmentNumber')?.value,
        streetNumber: order.get('streetNumber')?.value,
        phoneNumber: order.get('phoneNumber')?.value,
        email: order.get('email')?.value,
        type: '',
      };
    }

    this._createOrderCommandPort
      .createOrder(
        new CreateOrderCommand(
          client,
          this.employeeList,
          order.get('activitiesList')?.value,
          order.get('partList')?.value,
          order.get('dateOfAdmission')?.value,
          order.get('dateOfExecution')?.value,
          order.get('priority')?.value,
          order.get('status')?.value,
          order.get('period')?.value,
          order.get('note')?.value
        )
      )
      .pipe(take(1))
      .subscribe(() => this._router.navigate(['/orders']));
  }

  addEmployee() {
    if (this.employee) {
      this.employeeList.push(this.employee);

      this.dataSourceEmployee = new MatTableDataSource<EmployeeQuery>(
        this.employeeList
      );
    }
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

  getEmployee(employee: EmployeeQuery) {
    this.employee = employee;
  }

  getActivitiesTemplate(activitiesTemplate: ActivitiesTemplateQuery) {
    this.activities = {
      id: NaN,
      name: activitiesTemplate.name,
      attention: '',
      done: true,
    };
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

  addActivities() {
    const row = this._formBuilder.group({
      name: this.activities?.name,
      attention: '',
      done: true,
    });
    this.activitiesRows.push(row);
    this.updateActivitiesView();
  }



  setSummary($event: MatTabChangeEvent, order: FormGroup) {
    console.log(order.get('activitiesList.1')?.value)
    if ($event.index === 4) {
      this.order.setValue({
        name: order.get('name')?.value,
        nip: order.get('nip')?.value,
        phoneNumber: order.get('phoneNumber')?.value,
        status: order.get('status')?.value,
        priority: order.get('priority')?.value,
        dateOfAdmission: order.get('dateOfAdmission')?.value,
        dateOfExecution: order.get('dateOfExecution')?.value,
        period: order.get('period')?.value,
        street: order.get('street')?.value,
        city: order.get('city')?.value,
        streetNumber: order.get('streetNumber')?.value,
        apartmentNumber: order.get('apartmentNumber')?.value,
        zipcode: order.get('zipcode')?.value,
        email: order.get('email')?.value,
        note: order.get('note')?.value,
        activitiesList: order.get('activitiesList')?.value,
        partList: order.get('partList')?.value
      });
    }
  }





  private updateActivitiesView() {
    this.behaviorActivities.next(this.activitiesRows.controls);
  }

  private updatePartsView() {
    this.behaviorParts.next(this.partRows.controls);
  }
}
