import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { map, Observable, startWith } from "rxjs";
import { NewOrderQuery } from "../../../../application/ports/primary/query/new-order.query";
import {
  GETS_CURRENT_CLIENT_LIST_QUERY_PORT,
  GetsCurrentClientListQueryPort
} from "../../../../application/ports/primary/query/gets-current-client-list.query-port";
import {
  GETS_NEW_ORDER_CURRENCY_ELEMENTS_QUERY_PORT,
  GetsNewOrderCurrencyElementsQueryPort
} from "../../../../application/ports/primary/query/gets-new-order-currency-elements.query-port";
import { ClientListQuery } from "../../../../application/ports/primary/query/client-list.query";
import { ClientQuery } from "../../../../application/ports/primary/query/client.query";
import { ActivitiesDto } from "../../../../application/ports/secondary/dto/activities.dto";
import { EmployeeDto } from "../../../../application/ports/secondary/dto/employee/employee.dto";
import { MatTableDataSource } from "@angular/material/table";
import { OrderQuery } from "../../../../application/ports/primary/query/order.query";
import { EmployeeQuery } from "../../../../application/ports/primary/query/employee.query";

@Component({
  selector: "lib-new-order",
  styleUrls: ["./new-order.component.scss"],
  templateUrl: "./new-order.component.html",
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewOrderComponent {
  constructor(
    @Inject(GETS_NEW_ORDER_CURRENCY_ELEMENTS_QUERY_PORT)
    private _getsNewOrderCurrencyElementsQueryPort: GetsNewOrderCurrencyElementsQueryPort
  ) {
    this.elements$.subscribe((data) => (this.employeeQueries = data.employeeList));
    this.elements$.subscribe((data) => (this.clientQueries = data.clientList));

  }

  readonly order: FormGroup = new FormGroup({
    name: new FormControl(['',Validators.required]),
    nip: new FormControl(),
    phoneNumber: new FormControl(['']),
    status: new FormControl(),
    priority: new FormControl(),
    dateOfAdmission: new FormControl(),
    dateOfExecution: new FormControl(),
    period: new FormControl()
  });

  readonly elements$: Observable<NewOrderQuery> =
    this._getsNewOrderCurrencyElementsQueryPort.getNewOrderCurrencyElements();

  ngOnInit() {
    this.filteredClient = this.clientControl.valueChanges.pipe(
      startWith({} as ClientQuery),
      map(client => client && typeof client === "object" ? client.name : client
      ),
      map((name: string) => name ? this._filterClient(name) : this.clientQueries.slice())
    );

    this.filteredEmployee = this.employeeControl.valueChanges.pipe(
      startWith({} as EmployeeQuery),
      map(employee => employee && typeof employee === "object" ? employee.firstName : employee)
    ),
      map((firstName: string) => firstName ? this._filterEmployee(firstName) : this.employeeQueries.slice());


  }


  clientControl = new FormControl("");
  employeeControl = new FormControl("");
  clientQueries: ClientQuery[] = [];
  employeeQueries: EmployeeQuery[] = [];
  filteredClient: Observable<ClientQuery[]> | undefined;
  filteredEmployee: Observable<EmployeeQuery[]> | undefined;
  // client: ClientQuery = {
  //   id: 0,
  //   name: "",
  //   nip: "",
  //   address: "",
  //   city: "",
  //   numberPhone: "",
  //   email: "",
  //   type: ""
  // };
  // dataSourceEmployee = new MatTableDataSource<EmployeeQuery>();
  nameRowActivities: string[] = ["name", "attention", "done"];
  nameRowEmployee: string[] = ["firstName", "secondName", "lastName"];

  dataSourceActivites: ActivitiesDto[] = [
    {
      id: 1,
      name: "Wymiana uszczelki",
      attention: "Wykonano",
      done: true
    },
    {
      id: 2,
      name: "Wymiana głowicy",
      attention: "Brak",
      done: false
    }
  ];

  dataSourceEmployee: EmployeeDto[] = [
    {
      individualId: 1,
      firstName: "Adam",
      secondName: "Andrzej",
      lastName: "Wieczorek",
      pesel: 1234567890
    },
    {
      individualId: 2,
      firstName: "Paulina",
      secondName: "",
      lastName: "Wieczorek",
      pesel: 1234567890
    }

  ];

  getOptionClient(clientQueries: ClientQuery) {
    return clientQueries.name;
  }

  getOptionEmployee(employeeQueries: EmployeeQuery) {
    return employeeQueries.lastName;
  }

  _filterClient(name: string): ClientQuery[] {


    return this.clientQueries.filter(option => option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  _filterEmployee(firstName: string): EmployeeQuery[] {
    return this.employeeQueries.filter(option => option.firstName.toLowerCase().indexOf(firstName.toLowerCase()) === 0);
  }

  getClient(value: any) {
    // this.client = value;
    this.order.patchValue({
      name: value.name,
      nip: value.nip,
      phoneNumber: value.phoneNumber,
      // status: new FormControl(),
      // priority: new FormControl(),
      // dateOfAdmission: new FormControl(),
      // dateOfExecution: new FormControl(),
      // period: new FormControl()
    })


    console.log(value);
  }

  onOrderSubmitted(order: FormGroup): void {
    console.log(
      order.get("nip")?.value,
      order.get("status")?.value,
      order.get("uwagi")?.value,
      this.employeeQueries,
      this.clientQueries
    );
  }
}
