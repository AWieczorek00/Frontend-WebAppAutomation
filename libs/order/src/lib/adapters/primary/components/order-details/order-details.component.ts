import { ChangeDetectionStrategy, Component, Inject, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, switchMap, take } from 'rxjs/operators';
import { BehaviorSubject, Observable, map, startWith, throwError } from 'rxjs';
import { GET_ONE_ORDER_DTO_PORT, GetOneOrderDtoPort } from '../../../../application/ports/secondary/dto/order/get-one-order.dto-port';
import { GETS_NEW_ORDER_CURRENCY_ELEMENTS_QUERY_PORT, GetsNewOrderCurrencyElementsQueryPort } from '../../../../application/ports/primary/query/gets-new-order-currency-elements.query-port';
import { UPDATE_ORDER_COMMAND_PORT, UpdateOrderCommandPort } from '../../../../application/ports/primary/command/order/update-order.command-port';
import { PDF_ORDER_COMMAND_PORT, PdfOrderCommandPort } from '../../../../application/ports/primary/command/order/pdf-order.command-port';
import { INVOICE_PDF_COMMAND_PORT, InvoicePdfCommandPort } from '../../../../application/ports/primary/command/order/invoice-pdf.command-port';
import { EmployeeQuery } from '../../../../application/ports/primary/query/employee.query';
import { OrderQuery } from '../../../../application/ports/primary/query/order.query';
import { ClientQuery } from '../../../../application/ports/primary/query/client.query';
import { ActivitiesTemplateQuery } from '../../../../application/ports/primary/query/activities-template/activities-template.query';
import { PartsTemplateQuery } from '../../../../application/ports/primary/query/parts-template/parts-template.query';
import { NewOrderQuery } from '../../../../application/ports/primary/query/new-order.query';
import { ActivitiesQuery } from '../../../../application/ports/primary/query/activities.query';
import { ActivitiesTemplateDto } from '../../../../application/ports/secondary/dto/activitiesTemplate/activities-template.dto';
import { PartQuery } from '../../../../application/ports/primary/query/part/partQuery';
import { UpdateOrderCommand } from '../../../../application/ports/primary/command/order/update-order.command';
import { GenerationOrderPdfCommand } from '../../../../application/ports/primary/command/order/generation-order-pdf.command';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { saveAs } from 'file-saver';
import { formatDate } from '@angular/common';

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
    private _router: Router,
    @Inject(UPDATE_ORDER_COMMAND_PORT)
    private _updateOrderCommandPort: UpdateOrderCommandPort,
    private _snackBar: MatSnackBar,
    @Inject(LOCALE_ID) private locale: string,
    @Inject(PDF_ORDER_COMMAND_PORT)
    private _pdfOrderCommandPort: PdfOrderCommandPort, @Inject(INVOICE_PDF_COMMAND_PORT) private _invoicePdfCommandPort: InvoicePdfCommandPort
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

    this.order$.subscribe((data) =>
      data.activitiesList.forEach((activities) =>
        this.addActivitiesRows(activities)
      )
    );

    this.order$.subscribe((data) =>
      data.partList.forEach((part) => this.addPartsRows(part))
    );

    this.order$.subscribe(
      (data) =>
      (this.dataSourceEmployee = new MatTableDataSource<EmployeeQuery>(
        data.employeeList
      ))
    );

    this.order$.subscribe((data) =>
      data.employeeList.forEach((employee) => this.employeeList.push(employee))
    );

    this.order$.subscribe((order: OrderQuery) =>
      this.order.setValue({
        id: order.id,
        name: order.client,
        nip: order.client.nip,
        phoneNumber: order.client.phoneNumber,
        status: order.status,
        priority: order.priority,
        dateOfAdmission: order.dateOfAdmission,
        dateOfExecution: order.dateOfExecution,
        distance: order.distance,
        manHour: order.manHour,
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
  nameRowActivities: string[] = ['name', 'attention', 'done', 'delete'];
  nameRowEmployee = ['firstName', 'secondName', 'lastName', 'delete'];
  nameRowParts = ['name', 'price', 'tax', 'brutto', 'amount', 'delete'];
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
    id: new FormControl(),
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
    distance: new FormControl(),
    manHour: new FormControl(),
    activitiesList: this.activitiesRows,
    partList: this.partRows,
  });

  setSummary($event: MatTabChangeEvent, order: FormGroup) {
    if ($event.index === 4) {
      this.order.patchValue({
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
        partList: order.get('partList')?.value,
      });
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
      (option) =>
        option.name.toLowerCase().indexOf(name.toString().toLowerCase()) === 0
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
      tax: partsTemplate.tax,
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
  summaryDistance: number = 0;
  summaryManHour: number = 0;

  setDistance(order: any) {
    this.summaryDistance = order.get('distance')?.value * 2;
  }

  setManHour(order: FormGroup) {
    this.summaryManHour = order.get('manHour')?.value * 50;
  }

  private updateActivitiesView() {
    this.behaviorActivities.next(this.activitiesRows.controls);
  }

  private updatePartsView() {
    this.behaviorParts.next(this.partRows.controls);
  }

  addActivitiesRows(activities: ActivitiesQuery) {
    const row = this._formBuilder.group({
      id: activities.id,
      name: activities.name,
      attention: activities.attention,
      done: activities.done,
    });
    this.activitiesRows.push(row);
    this.updateActivitiesView();
  }

  private addPartsRows(part: PartQuery) {
    const row = this._formBuilder.group({
      id: part.id,
      name: part.name,
      price: part.price,
      tax: part.tax,
      amount: part.amount,
    });
    this.partRows.push(row);
    this.updatePartsView();
  }

  deleteActivities(id: number) {
    this.activitiesRows.removeAt(id);
    this.updateActivitiesView();
  }

  deleteParts(id: number) {
    this.partRows.removeAt(id);
    this.updatePartsView();
  }

  deleteEmployee(id: number) {
    this.employeeList = this.employeeList.filter(
      (employee) => employee.individualId !== id
    );
    this.dataSourceEmployee = new MatTableDataSource<EmployeeQuery>(
      this.employeeList
    );
  }

  update(order: FormGroup) {
    console.log('test');
    this._updateOrderCommandPort
      .updateOrder(
        new UpdateOrderCommand(
          order.get('id')?.value,
          order.get('name')?.value,
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
      .subscribe(() => this._router.navigate(['/orders']));
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

  taxToPercent(tax: number): number {
    return tax * 100
  }

  brutto(tax: number, netto: number): number {
    let sum = netto * tax * 10
    return Math.abs(Number(sum.toFixed(1)))
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
}
