import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { NewOrderQuery } from '../../../../application/ports/primary/query/new-order.query';
import {
  GETS_CURRENT_CLIENT_LIST_QUERY_PORT,
  GetsCurrentClientListQueryPort,
} from '../../../../application/ports/primary/query/gets-current-client-list.query-port';
import {
  GETS_NEW_ORDER_CURRENCY_ELEMENTS_QUERY_PORT,
  GetsNewOrderCurrencyElementsQueryPort,
} from '../../../../application/ports/primary/query/gets-new-order-currency-elements.query-port';
import { ClientListQuery } from '../../../../application/ports/primary/query/client-list.query';
import { ClientQuery } from '../../../../application/ports/primary/query/client.query';
import { ActivitiesDto } from '../../../../application/ports/secondary/dto/activities.dto';
import {EmployeeDto} from "../../../../application/ports/secondary/dto/employee/employee.dto";
import {MatTableDataSource} from "@angular/material/table";
import {OrderQuery} from "../../../../application/ports/primary/query/order.query";
import {EmployeeQuery} from "../../../../application/ports/primary/query/employee.query";

@Component({
  selector: 'lib-new-order',
  styleUrls: ['./new-order.component.scss'],
  templateUrl: './new-order.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewOrderComponent {
  constructor(
    @Inject(GETS_CURRENT_CLIENT_LIST_QUERY_PORT)
    private _getsCurrentClientListQueryPort: GetsCurrentClientListQueryPort,
    @Inject(GETS_NEW_ORDER_CURRENCY_ELEMENTS_QUERY_PORT)
    private _getsNewOrderCurrencyElementsQueryPort: GetsNewOrderCurrencyElementsQueryPort
  ) {
    this.elements$.subscribe((data) => (this.employeeQueries = data.employeeList));
    this.elements$.subscribe((data) => (this.clientQueriess = data.clientList));
    console.log(this.employeeQueries)

    // this.filteredEmployee = this.employeeControl.valueChanges.pipe(
    //   startWith(''),
    //   map((employee) =>
    //     employee ? this._filterEmployee(employee) : this.employeeQueries.slice()
    //   )
    // );

  }

  readonly order: FormGroup = new FormGroup({
    name: new FormControl(),
    nip: new FormControl(),
    phoneNumber: new FormControl(),
    status: new FormControl(),
    priority: new FormControl(),
    dateOfAdmission: new FormControl(),
    dateOfExecution: new FormControl(),
    period: new FormControl(),
  });

  readonly elements$: Observable<NewOrderQuery> =
    this._getsNewOrderCurrencyElementsQueryPort.getNewOrderCurrencyElements();

  ngOnInit() {
    this.filteredClient = this.clientControl.valueChanges.pipe(
      startWith(''),
      // map((value) => this._filter(value || ''))
      map((client) =>
        client ? this._filterClient(client) : this.clientQueriess.slice()
      )
    );



  }

  readonly client$: Observable<ClientListQuery> =
    this._getsCurrentClientListQueryPort.getCurrentClientList();

  clientControl = new FormControl('');
  // employeeControl = new FormControl('');
  clientQueriess: ClientQuery[] = [];
  employeeQueries: EmployeeQuery[] = [];
  filteredClient: Observable<ClientQuery[]> | undefined;
  filteredEmployee: Observable<EmployeeQuery[]> | undefined;
  // dataSourceEmployee = new MatTableDataSource<EmployeeQuery>();
  nameRowActivities: string[] = ['name', 'attention', 'done'];
  nameRowEmployee: string[] = ['firstName', 'secondName', 'lastName'];

  dataSourceActivites: ActivitiesDto[] = [
    {
      id: 1,
      name: 'Wymiana uszczelki',
      attention: 'Wykonano',
      done: true,
    },
    {
      id: 2,
      name: 'Wymiana głowicy',
      attention: 'Brak',
      done: false,
    },
  ];

  dataSourceEmployee:EmployeeDto[]=[
    {
      individualId:1,
      firstName:"Adam",
      secondName:"Andrzej",
      lastName:"Wieczorek",
      pesel:1234567890
    },
    {
      individualId:2,
      firstName:"Paulina",
      secondName:"",
      lastName:"Wieczorek",
      pesel:1234567890
    }

  ]

  getOptionClient(clientQueries: ClientQuery) {
    return clientQueries.name;
  }

  getOptionEmployee(employeeQueries: EmployeeQuery) {
    return employeeQueries.lastName;
  }

  _filterClient(value: ClientQuery): ClientQuery[] {
    const filterValue = value.name.toLowerCase();

    return this.clientQueriess.filter((client) =>
      client.name.toLowerCase().includes(filterValue)
    );
  }

  // _filterEmployee(value: EmployeeQuery): EmployeeQuery[] {
  //   const filterValue = value.lastName.toLowerCase();
  //
  //   return this.employeeQueries.filter((client) =>
  //     client.lastName.toLowerCase().includes(filterValue)
  //   );
  // }

  getPosts(value: any) {
    console.log(value);
  }

  onOrderSubmitted(order: FormGroup): void {
    console.log(
      order.get('nip')?.value,
      order.get('status')?.value,
      order.get('uwagi')?.value
    );
  }
}
