import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetAllDtoPort } from '../../../application/ports/secondary/dto/get-all.dto-port';
import { AddOrderDtoPort } from '../../../application/ports/secondary/dto/add-order.dto-port';
import { DeleteOrderDtoPort } from '../../../application/ports/secondary/dto/delete-order.dto-port';
import { OrderDto } from '../../../application/ports/secondary/dto/order.dto';

@Injectable()
export class OrderService implements GetAllDtoPort, AddOrderDtoPort, DeleteOrderDtoPort {
  constructor(private _httpClient: HttpClient) { }

  getAll(): Observable<OrderDto[]> {
    return this._httpClient
      .get<OrderDto[]>('http://localhost:8080/order/all')
      .pipe(
        map((orders) =>
          orders.map((order) => {
            return {
              id: order.id,
              employeeList: order.employeeList
                ? order.employeeList.map((employee) => ({
                  individualId: employee.individualId,
                  firstName: employee.firstName,
                  secondName: employee.secondName,
                  lastName: employee.lastName,
                  pesel: employee.pesel,
                }))
                : [],
              client: order.client,
              activitiesList: order.activitiesList,
              dateOfAdmission: order.dateOfAdmission,
              dateOfExecution: order.dateOfExecution,
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
    return this._httpClient.post<void>("http://localhost:8080/order/add", orderDto)
  }

  delete(id: number): Observable<void> {
    return this._httpClient.delete<void>("http://localhost:8080/order/delete/"+id );
  }
}

