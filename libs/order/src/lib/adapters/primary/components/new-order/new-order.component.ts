import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, map, Observable, startWith } from 'rxjs';
import {
  GETS_NEW_ORDER_CURRENCY_ELEMENTS_QUERY_PORT,
  GetsNewOrderCurrencyElementsQueryPort,
} from '../../../../application/ports/primary/query/gets-new-order-currency-elements.query-port';
import {
  CREATE_ORDER_COMMAND_PORT,
  CreateOrderCommandPort,
} from '../../../../application/ports/primary/command/order/create-order.command-port';
import { NewOrderQuery } from '../../../../application/ports/primary/query/new-order.query';
import { ClientQuery } from '../../../../application/ports/primary/query/client.query';
import { EmployeeQuery } from '../../../../application/ports/primary/query/employee.query';
import { ActivitiesTemplateQuery } from '../../../../application/ports/primary/query/activities-template/activities-template.query';
import { ActivitiesTemplateDto } from '../../../../application/ports/secondary/dto/activitiesTemplate/activities-template.dto';
import { ActivitiesQuery } from '../../../../application/ports/primary/query/activities.query';
import { OrderQuery } from '../../../../application/ports/primary/query/order.query';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CreateOrderCommand } from '../../../../application/ports/primary/command/order/create-order.command';
import { take } from 'rxjs/operators';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {PartsTemplateQuery} from "../../../../application/ports/primary/query/parts-template/parts-template.query";

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
    private _fromBuilder: FormBuilder
  ) {
    this.elements$.subscribe(
      (employee) => (this.employeeListAutocomplete = employee.employeeList)
    );
    this.elements$.subscribe((data) => (this.clientListAutocomplete = data.clientList));
    this.elements$.subscribe((data) => (this.partsTemplateListAutocomplete=data.partsTemplateList));
    this.elements$.subscribe(
      (data) => (this.activitiesTemplateListAutocomplete = data.activitiesTemplateList)
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

  }
  rows: FormArray = this._fromBuilder.array([]);

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
    activitiesList: this.rows
  });

  readonly attention: FormGroup = new FormGroup({
    attention: new FormControl(''),
  });

  readonly elements$: Observable<NewOrderQuery> =
    this._getsNewOrderCurrencyElementsQueryPort.getNewOrderCurrencyElements();



  clientControl = new FormControl('');
  employeeControl = new FormControl('');
  activitiesTemplateControl = new FormControl('');
  clientListAutocomplete: ClientQuery[] = [];
  employeeListAutocomplete: EmployeeQuery[] = [];
  partsTemplateListAutocomplete!: PartsTemplateQuery[]
  activitiesTemplateListAutocomplete: ActivitiesTemplateDto[] = [];
  filteredClient: Observable<ClientQuery[]> | undefined;
  filteredEmployee: Observable<EmployeeQuery[]> | undefined;
  filteredActivitiesTemplate: Observable<ActivitiesTemplateDto[]> | undefined;
  employee: EmployeeQuery | undefined;
  activities: ActivitiesQuery | undefined;
  dataSourceEmployee = new MatTableDataSource<EmployeeQuery>();
  nameRowEmployee: string[] = ['firstName', 'secondName', 'lastName'];
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

  _filterClient(name: string): ClientQuery[] {
    return this.clientListAutocomplete.filter(
      (option) => option.name.toLowerCase().indexOf(name.toLowerCase()) === 0
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
          order.get('dateOfAdmission')?.value,
          order.get('dateOfExecution')?.value,
          order.get('priority')?.value,
          order.get('status')?.value,
          order.get('period')?.value,
          order.get('note')?.value
        )
      )
      .pipe(take(1))
      .subscribe(() => this.order.reset());
  }

  addEmployee() {
    if (this.employee) {
      this.employeeList.push(this.employee);

      this.dataSourceEmployee = new MatTableDataSource<EmployeeQuery>(
        this.employeeList
      );
    }
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

    console.log(this.activities);

  }

  addActivities() {

    const row = this._fromBuilder.group({
      name: this.activities?.name,
      attention: '',
      done:true
    });
    this.rows.push(row);
    this.updateView();

    console.log(this.order.get('activitiesList'))



  }

  changeFn($event: string) {
    console.log($event);
  }


  onEnter($event: any) {
    console.log($event.source);
  }

  setSummary($event: MatTabChangeEvent, order: FormGroup) {
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
        activitiesList: order.get('activitiesList')?.value
      });
    }
  }

  // -----------------------------------------------------------------------TEST-------------------------------------------

  data = [];
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  displayColumns = ['name', 'attention','done'];
  // rows: FormArray = this.fb.array([]);
  form: FormGroup = this._fromBuilder.group({
    activities: this.rows,
  });
  nameRowActivities=['name', 'attention','done'];



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
    const row = this._fromBuilder.group({
      name: '',
      attention: 30,
      done:true
    });
    this.rows.push(row);
    this.updateView();
  }

  updateView() {
    this.dataSource.next(this.rows.controls);
  }
}
