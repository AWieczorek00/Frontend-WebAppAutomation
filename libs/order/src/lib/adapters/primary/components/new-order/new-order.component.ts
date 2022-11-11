import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
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
import { MatTableDataSource } from '@angular/material/table';
import { CreateOrderCommand } from '../../../../application/ports/primary/command/order/create-order.command';
import {take} from "rxjs/operators";

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
    private _createOrderCommandPort: CreateOrderCommandPort
  ) {
    this.elements$.subscribe(
      (employee) => (this.employeeQueries = employee.employeeList)
    );
    this.elements$.subscribe((data) => (this.clientQueries = data.clientList));
    this.elements$.subscribe(
      (data) => (this.activitiesTemplateQueries = data.activitiesTemplateList)
    );
  }

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
  });

  readonly attention:FormGroup = new FormGroup({
    attention: new FormControl('')
  })

  readonly elements$: Observable<NewOrderQuery> =
    this._getsNewOrderCurrencyElementsQueryPort.getNewOrderCurrencyElements();

  ngOnInit() {
    this.filteredClient = this.clientControl.valueChanges.pipe(
      startWith({} as ClientQuery),
      map((client) =>
        client && typeof client === 'object' ? client.name : client
      ),
      map((name: string) =>
        name ? this._filterClient(name) : this.clientQueries.slice()
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
          : this.employeeQueries.slice()
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
            : this.activitiesTemplateQueries.slice()
        )
      );
  }

  clientControl = new FormControl('');
  employeeControl = new FormControl('');
  activitiesTemplateControl = new FormControl('');
  clientQueries: ClientQuery[] = [];
  employeeQueries: EmployeeQuery[] = [];
  activitiesTemplateQueries: ActivitiesTemplateDto[] = [];
  filteredClient: Observable<ClientQuery[]> | undefined;
  filteredEmployee: Observable<EmployeeQuery[]> | undefined;
  filteredActivitiesTemplate: Observable<ActivitiesTemplateDto[]> | undefined;
  employee: EmployeeQuery | undefined;
  activities: ActivitiesQuery | undefined;
  dataSourceEmployee = new MatTableDataSource<EmployeeQuery>();
  nameRowActivities: string[] = ['name', 'attention', 'done'];
  nameRowEmployee: string[] = ['firstName', 'secondName', 'lastName'];
  employeeList: EmployeeQuery[] = [];
  activitiesList: ActivitiesQuery[] = [];

  dataSourceActivities = new MatTableDataSource<ActivitiesQuery>();
  orderO: OrderQuery | undefined;
  mymodel: any;

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
    return this.clientQueries.filter(
      (option) => option.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }

  _filterEmployee(firstName: string): EmployeeQuery[] {
    return this.employeeQueries.filter(
      (option) =>
        option.firstName.toLowerCase().indexOf(firstName.toLowerCase()) === 0
    );
  }

  _filterActivitiesTemplate(name: string): ActivitiesTemplateQuery[] {
    return this.activitiesTemplateQueries.filter(
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

    this._createOrderCommandPort.createOrder(
      new CreateOrderCommand(
        NaN,
        this.employeeList,
        client,
        this.activitiesList,
        order.get('dateOfAdmission')?.value,
        order.get('dateOfExecution')?.value,
        order.get('priority')?.value,
        order.get('status')?.value,
        order.get('period')?.value,
        order.get('note')?.value
      )
    ).pipe(take(1))
      .subscribe(()=>this.order.reset());

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
      id: this.activitiesList.length+1,
      name: activitiesTemplate.name,
      attention: '',
      done: true,
    };

    console.log(this.activities)
  }

  addActivities() {
    if (this.activities) {
      this.activitiesList.push(this.activities);
      this.dataSourceActivities = new MatTableDataSource<ActivitiesQuery>(
        this.activitiesList
      );
    }
  }



  changeFn($event: string) {
    console.log($event)
  }

  valuechange(event: string,id:number) {
    console.log(event)

  }
}
