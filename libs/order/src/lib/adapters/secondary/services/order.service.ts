import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { GetAllDtoPort } from '../../../application/ports/secondary/dto/get-all.dto-port';
import { OrderDto } from '../../../application/ports/secondary/dto/order.dto';
import { EmployeeDto } from '../../../application/ports/secondary/dto/employee/employee.dto';

@Injectable()
export class OrderService implements GetAllDtoPort {
  constructor(private _httpClient: HttpClient) {}

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
}

// .pipe(map((orders)=>
//   orders.map((order)=>
//     {
//       return{
//         id:order.id,
//         employees:order.employees? order.employees.map((employee)=> ({
//           individualId:employee.individualId,
//           firstName:employee.firstName,
//           secondName:employee.secondName,
//           lastName:employee.lastName,
//           pesel:employee.pesel
//         }as EmployeeDto)):[],
//         client:order.client,
//         activities:order.activities,
//         dateOfAdmission:order.dateOfAdmission,
//         dateOfExecution:order.dateOfExecution,
//         priority:order.priority,
//         status:order.status,
//         period:order.period,
//         note:order.note
//
//       }
//     }
//   )
// ));
