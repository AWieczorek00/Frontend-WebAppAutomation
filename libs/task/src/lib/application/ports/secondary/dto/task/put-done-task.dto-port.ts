import { InjectionToken } from '@angular/core';
import {TaskDto} from "./task.dto";
import {Observable} from "rxjs";

export const PUT_DONE_TASK_DTO_PORT = new InjectionToken<PutDoneTaskDtoPort>('PUT_DONE_TASK_DTO_PORT');

export interface PutDoneTaskDtoPort {
  done(task:TaskDto):Observable<void>
}
