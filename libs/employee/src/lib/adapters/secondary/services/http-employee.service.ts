import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetAllEmployeeDtoPort } from '../../../application/ports/secondary/dto/employee/get-all-employee.dto-port';
import { AddEmployeeDtoPort } from '../../../application/ports/secondary/dto/employee/add-employee.dto-port';
import { DeleteEmployeeDtoPort } from '../../../application/ports/secondary/dto/employee/delete-employee.dto-port';
import { UpdateEmployeeDtoPort } from '../../../application/ports/secondary/dto/update-employee.dto-port';
import { GetOneEmployeeDtoPort } from '../../../application/ports/secondary/dto/get-one-employee.dto-port';
import { EmployeeDto } from '../../../application/ports/secondary/dto/employee/employee.dto';

@Injectable()
export class HttpEmployeeService implements GetAllEmployeeDtoPort, AddEmployeeDtoPort, DeleteEmployeeDtoPort, UpdateEmployeeDtoPort, GetOneEmployeeDtoPort {
  constructor(private _httpClient: HttpClient) {
  }

  private url = 'http://localhost:8080/';
  getAll(): Observable<EmployeeDto[]> {
    return this._httpClient.get<EmployeeDto[]>(this.url + 'employee/all');
  }

  add(employee: Omit<Partial<EmployeeDto>, 'individualId'>): Observable<void> {
    return this._httpClient.post<void>(this.url + 'employee/add', employee)
  }

  delete(individualId: number): Observable<void> {
    return this._httpClient.delete<void>(this.url + 'employee/delete/' + individualId)
  }

  update(employee: Partial<EmployeeDto>): Observable<void> {
    return this._httpClient.put<void>(this.url + 'employee/update', employee)
  }

  getOne(individualId: number): Observable<EmployeeDto> {
    return this._httpClient.get<EmployeeDto>(this.url+"employee/"+individualId)
  }
}
