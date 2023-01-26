import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetAllDtoPort } from '../../../application/ports/secondary/dto/order/get-all.dto-port';
import { AddOrderDtoPort } from '../../../application/ports/secondary/dto/order/add-order.dto-port';
import { DeleteOrderDtoPort } from '../../../application/ports/secondary/dto/order/delete-order.dto-port';
import { DuplicateOrderDtoPort } from '../../../application/ports/secondary/dto/order/duplicate-order.dto-port';
import { GetOneOrderDtoPort } from '../../../application/ports/secondary/dto/order/get-one-order.dto-port';
import { PutOrderDtoPort } from '../../../application/ports/secondary/dto/order/put-order.dto-port';
import { OrderPdfDtoPort } from '../../../application/ports/secondary/dto/order/order-pdf.dto-port';
import { InvoicePdfDtoPort } from '../../../application/ports/secondary/dto/order/invoice-pdf.dto-port';
import { OrderDto } from '../../../application/ports/secondary/dto/order/order.dto';

@Injectable()
export class OrderService
  implements
  GetAllDtoPort,
  AddOrderDtoPort,
  DeleteOrderDtoPort,
  DuplicateOrderDtoPort,
  GetOneOrderDtoPort,
  PutOrderDtoPort, OrderPdfDtoPort, InvoicePdfDtoPort {
  constructor(private _httpClient: HttpClient) { }
  private url = 'http://localhost:8080/';
  getAll(): Observable<OrderDto[]> {
    return this._httpClient.get<OrderDto[]>(this.url + 'order/all').pipe(
      map((orders) =>
        orders.map((order) => {
          return {
            id: order.id,
            employeeList: order.employeeList,
            client: order.client,
            activitiesList: order.activitiesList,
            partList: order.partList,
            dateOfAdmission: order.dateOfAdmission,
            dateOfExecution: order.dateOfExecution,
            manHour: order.manHour,
            distance: order.distance,
            priority: order.priority,
            status: order.status,
            period: order.period,
            note: order.note,
          };
        })
      )
    );
  }

  //TODO  Sprawdz Emit id w state-traning
  add(orderDto: Partial<OrderDto>): Observable<void> {
    return this._httpClient.post<void>(this.url + 'order/add', orderDto);
  }

  delete(id: number): Observable<void> {
    return this._httpClient.delete<void>(this.url + 'order/delete/' + id);
  }

  duplicateOrder(id: number): Observable<OrderDto> {
    return this._httpClient.post<OrderDto>(this.url + 'order/duplicate/', id);
  }

  getOneOrder(id: number): Observable<OrderDto> {
    return this._httpClient.get<OrderDto>(this.url + 'order/one/' + id);
  }

  putOrder(order: OrderDto): Observable<void> {
    return this._httpClient.put<void>(this.url + 'order/update', order);
  }

  orderPdf(order: OrderDto): Observable<any> {
    return this._httpClient.post(this.url + 'order/protocol', order, { responseType: 'blob' })
  }

  invoice(order: OrderDto): Observable<any> {
    return this._httpClient.post(this.url + 'order/invoice', order, { responseType: 'blob' })
  }
}
