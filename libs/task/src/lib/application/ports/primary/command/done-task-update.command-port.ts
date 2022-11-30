import { InjectionToken } from '@angular/core';
import {DoneTaskCommand} from "./done-task.command";
import {Observable} from "rxjs";

export const DONE_TASK_UPDATE_COMMAND_PORT = new InjectionToken<DoneTaskUpdateCommandPort>('DONE_TASK_UPDATE_COMMAND_PORT');

export interface DoneTaskUpdateCommandPort {
  done(command:DoneTaskCommand):Observable<void>
}
