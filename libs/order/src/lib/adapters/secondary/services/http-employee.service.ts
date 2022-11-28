import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetAllEmployeeDtoPort } from '../../../application/ports/secondary/dto/employee/get-all-employee.dto-port';
import { EmployeeDto } from '../../../application/ports/secondary/dto/employee/employee.dto';

@Injectable()
export class HttpEmployeeService implements GetAllEmployeeDtoPort {
  constructor(private _httpClient: HttpClient) {
  }
  private url = 'http://localhost:8080/';
  getAll(): Observable<EmployeeDto[]> {
    return this._httpClient.get<EmployeeDto[]>(this.url+'employee/all');
  }
}
