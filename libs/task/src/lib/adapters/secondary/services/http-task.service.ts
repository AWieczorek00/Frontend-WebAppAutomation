import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetAllTaskDtoPort } from '../../../application/ports/secondary/dto/task/get-all-task.dto-port';
import { AddTaskDtoPort } from '../../../application/ports/secondary/dto/task/add-task.dto-port';
import { TaskDto } from '../../../application/ports/secondary/dto/task/task.dto';

@Injectable()
export class HttpTaskService implements GetAllTaskDtoPort, AddTaskDtoPort {
  constructor(private _httpClient: HttpClient) {
  }

  private url='http://localhost:8080/'

  getAll(): Observable<TaskDto[]> {
    return this._httpClient.get<TaskDto[]>(this.url+'task/all');
  }

  add(task: Omit<Partial<TaskDto>, 'id'>): Observable<void> {
    return this._httpClient.post<void>('http://localhost:8080/task/add',task)
  }
}