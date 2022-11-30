import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetAllTaskDtoPort } from '../../../application/ports/secondary/dto/task/get-all-task.dto-port';
import { AddTaskDtoPort } from '../../../application/ports/secondary/dto/task/add-task.dto-port';
import { GetAllTaskByEmployeeDtoPort } from '../../../application/ports/secondary/dto/task/get-all-task-by-employee.dto-port';
import { PutDoneTaskDtoPort } from '../../../application/ports/secondary/dto/task/put-done-task.dto-port';
import { TaskDto } from '../../../application/ports/secondary/dto/task/task.dto';

@Injectable()
export class HttpTaskService
  implements
    GetAllTaskDtoPort,
    AddTaskDtoPort,
    GetAllTaskByEmployeeDtoPort,
    PutDoneTaskDtoPort
{
  constructor(private _httpClient: HttpClient) {}

  private url = 'http://localhost:8080/';

  getAll(): Observable<TaskDto[]> {
    return this._httpClient.get<TaskDto[]>(this.url + 'task/all');
  }

  add(task: Omit<Partial<TaskDto>, 'id'>): Observable<void> {
    return this._httpClient.post<void>(this.url + 'task/add', task);
  }

  getAllTaskByEmployee(individualId: number): Observable<TaskDto[]> {
    let params = new HttpParams();
    params = params.append('individualId', individualId);
    return this._httpClient.get<TaskDto[]>(this.url + 'task/employee/all', {
      params: params,
    });
  }

  done(task: TaskDto): Observable<void> {
    return this._httpClient.put<void>(this.url+'task/update/done',task)
  }
}
