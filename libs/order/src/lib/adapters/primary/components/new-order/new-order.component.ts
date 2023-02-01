import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  LOCALE_ID,
  ViewEncapsulation,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import {
  BehaviorSubject,
  map,
  Observable,
  startWith,
  take,
  throwError,
} from 'rxjs';
import { Router } from '@angular/router';
import {
  GETS_NEW_ORDER_CURRENCY_ELEMENTS_QUERY_PORT,
  GetsNewOrderCurrencyElementsQueryPort,
} from '../../../../application/ports/primary/query/gets-new-order-currency-elements.query-port';
import {
  CREATE_ORDER_COMMAND_PORT,
  CreateOrderCommandPort,
} from '../../../../application/ports/primary/command/order/create-order.command-port';
import {
  PDF_ORDER_COMMAND_PORT,
  PdfOrderCommandPort,
} from '../../../../application/ports/primary/command/order/pdf-order.command-port';
import {
  INVOICE_PDF_COMMAND_PORT,
  InvoicePdfCommandPort,
} from '../../../../application/ports/primary/command/order/invoice-pdf.command-port';
import { ClientQuery } from '../../../../application/ports/primary/query/client.query';
import { EmployeeQuery } from '../../../../application/ports/primary/query/employee.query';
import { ActivitiesTemplateQuery } from '../../../../application/ports/primary/query/activities-template/activities-template.query';
import { PartsTemplateQuery } from '../../../../application/ports/primary/query/parts-template/parts-template.query';
import { NewOrderQuery } from '../../../../application/ports/primary/query/new-order.query';
import { ActivitiesTemplateDto } from '../../../../application/ports/secondary/dto/activitiesTemplate/activities-template.dto';
import { ActivitiesQuery } from '../../../../application/ports/primary/query/activities.query';
import { PartQuery } from '../../../../application/ports/primary/query/part/partQuery';
import { CreateOrderCommand } from '../../../../application/ports/primary/command/order/create-order.command';
import { AddActivitiesComponent } from '../add-activities/add-activities.component';
import { GenerationOrderPdfCommand } from '../../../../application/ports/primary/command/order/generation-order-pdf.command';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { saveAs } from 'file-saver';
import { formatDate } from '@angular/common';

@Component({
  selector: 'lib-new-order',
  styleUrls: ['./new-order.component.scss'],
  templateUrl: './new-order.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewOrderComponent {
  constructor(
    private _snackBar: MatSnackBar,
    @Inject(LOCALE_ID) private locale: string,
    private _httpClient: HttpClient,
    @Inject(GETS_NEW_ORDER_CURRENCY_ELEMENTS_QUERY_PORT)
    private _getsNewOrderCurrencyElementsQueryPort: GetsNewOrderCurrencyElementsQueryPort,
    @Inject(CREATE_ORDER_COMMAND_PORT)
    private _createOrderCommandPort: CreateOrderCommandPort,
    private _formBuilder: FormBuilder,
    private _router: Router,
    public dialog: MatDialog,
    @Inject(PDF_ORDER_COMMAND_PORT)
    private _pdfOrderCommandPort: PdfOrderCommandPort,
    @Inject(INVOICE_PDF_COMMAND_PORT)
    private _invoicePdfCommandPort: InvoicePdfCommandPort
  ) {
    this.elements$.subscribe((data) => this.loadList(data));

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
    id: new FormControl(),
    name: new FormControl(),
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
    distance: new FormControl(),
    manHour: new FormControl(),
    activitiesList: this.activitiesRows,
    partList: this.partRows,
  });

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
  nameRowEmployee: string[] = ['firstName', 'secondName', 'lastName', 'delete'];
  nameRowActivities = ['name', 'attention', 'done', 'delete'];
  nameRowParts = ['name', 'price', 'tax', 'brutto', 'amount', 'delete'];
  employeeList: EmployeeQuery[] = [];

  // activitiesList: ActivitiesQuery[] = [];
  summaryDistance: any;
  summaryManHour: any;
  myModel: any;

  getOptionClient(clientQueries: ClientQuery) {
    if(clientQueries===null){
      return ''
    }
    return clientQueries['name'];
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
      (option) =>
        option.name.toLowerCase().indexOf(name.toString().toLowerCase()) === 0
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
    this.myModel=value.name
    this.order.patchValue({
      // name: value.name,
      id: value.id,
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
        id: order.get('id')?.value,
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

    console.log(client);

    this._createOrderCommandPort
      .createOrder(
        new CreateOrderCommand(
          client,
          this.employeeList,
          order.get('activitiesList')?.value,
          order.get('partList')?.value,
          order.get('dateOfAdmission')?.value,
          order.get('dateOfExecution')?.value,
          order.get('manHour')?.value,
          order.get('distance')?.value,
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
    this.employeeList.push(this.employeeControl.value);
    this.dataSourceEmployee = new MatTableDataSource<EmployeeQuery>(
      this.employeeList
    );
  }

  addPart() {
    const row = this._formBuilder.group({
      name: this.part?.name,
      price: this.part?.price,
      tax: this.part?.tax,
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
      tax: partsTemplate.tax,
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
        distance: order.get('distance')?.value,
        manHour: order.get('manHour')?.value,
        activitiesList: order.get('activitiesList')?.value,
        partList: order.get('partList')?.value,
      });
    }
  }

  private updateActivitiesView() {
    this.behaviorActivities.next(this.activitiesRows.controls);
  }

  private updatePartsView() {
    this.behaviorParts.next(this.partRows.controls);
  }

  openNewActivities() {
    this.dialog.open(AddActivitiesComponent, {
      width: '300px',
    });
  }

  setDistance(order: any) {
    this.summaryDistance = order.get('distance')?.value * 2;
  }

  setManHour(order: FormGroup) {
    this.summaryManHour = order.get('manHour')?.value * 50;
  }

  orderPdf(order: FormGroup) {
    var mediaType = 'application/pdf';

    if (this.employeeList.length === 0) {
      this._snackBar.open('Brakuje serwisanta', 'Zamknij', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else {
      this._pdfOrderCommandPort
        .orderPdf(
          new GenerationOrderPdfCommand(
            NaN,
            this.createClient(order),
            this.employeeList,
            order.get('activitiesList')?.value,
            order.get('partList')?.value,
            order.get('dateOfAdmission')?.value,
            order.get('dateOfExecution')?.value,
            order.get('manHour')?.value,
            order.get('distance')?.value,
            order.get('priority')?.value,
            order.get('status')?.value,
            order.get('period')?.value,
            order.get('note')?.value
          )
        )
        .pipe(take(1))
        .subscribe(
          (response) => {
            var blob = new Blob([response], { type: mediaType });
            saveAs(
              blob,
              this.createClient(order).name +
                '/' +
                formatDate(
                  order.get('dateOfExecution')?.value,
                  'yyyy-MM-dd',
                  this.locale
                ) +
                '.pdf'
            );
          },
          (e) => {
            throwError(e);
          }
        );
    }
  }

  createClient(order: FormGroup): ClientQuery {
    var client: ClientQuery;

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
    return client;
  }

  deleteActivities(index: number) {
    this.activitiesRows.removeAt(index);
    this.updateActivitiesView();
  }

  deleteEmployee(individualId: number) {
    this.employeeList = this.employeeList.filter(
      (employee) => employee.individualId !== individualId
    );
    this.dataSourceEmployee = new MatTableDataSource<EmployeeQuery>(
      this.employeeList
    );
  }

  deleteParts(index: number) {
    this.partRows.removeAt(index);
    this.updatePartsView();
  }

  taxToPercent(tax: number): number {
    return tax * 100;
  }

  brutto(tax: number, netto: number): number {
    let sum = netto * tax * 10;
    return Math.abs(Number(sum.toFixed(1)));
  }

  InvoicePdf(order: FormGroup) {
    var mediaType = 'application/pdf';

    if (this.employeeList.length === 0) {
      this._snackBar.open('Brakuje serwisanta', 'Zamknij', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    } else {
      this._invoicePdfCommandPort
        .InvoicePdf(
          new GenerationOrderPdfCommand(
            NaN,
            this.createClient(order),
            this.employeeList,
            order.get('activitiesList')?.value,
            order.get('partList')?.value,
            order.get('dateOfAdmission')?.value,
            order.get('dateOfExecution')?.value,
            order.get('manHour')?.value,
            order.get('distance')?.value,
            order.get('priority')?.value,
            order.get('status')?.value,
            order.get('period')?.value,
            order.get('note')?.value
          )
        )
        .pipe(take(1))
        .subscribe(
          (response) => {
            var blob = new Blob([response], { type: mediaType });
            saveAs(
              blob,
              this.createClient(order).name +
                '/' +
                formatDate(
                  order.get('dateOfExecution')?.value,
                  'yyyy-MM-dd',
                  this.locale
                ) +
                '.pdf'
            );
          },
          (e) => {
            throwError(e);
          }
        );
    }
  }

  loadList(elements: NewOrderQuery) {
    this.employeeListAutocomplete = elements.employeeList;
    this.clientListAutocomplete = elements.clientList;
    this.partsTemplateListAutocomplete = elements.partsTemplateList;
    this.activitiesTemplateListAutocomplete = elements.activitiesTemplateList;
  }
}
