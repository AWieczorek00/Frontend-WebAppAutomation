import { NgModule } from '@angular/core';
import { HttpTaskService } from './http-task.service';
import { GET_ALL_TASK_DTO_PORT } from '../../../application/ports/secondary/dto/task/get-all-task.dto-port';
import { ADD_TASK_DTO_PORT } from '../../../application/ports/secondary/dto/task/add-task.dto-port';
import { GET_ALL_TASK_BY_EMPLOYEE_DTO_PORT } from '../../../application/ports/secondary/dto/task/get-all-task-by-employee.dto-port';
import { PUT_DONE_TASK_DTO_PORT } from '../../../application/ports/secondary/dto/task/put-done-task.dto-port';
import { DELETE_TASK_DTO_PORT } from '../../../application/ports/secondary/dto/task/delete-task.dto-port';

@NgModule({
  imports: [],
  declarations: [],
  providers: [HttpTaskService, { provide: GET_ALL_TASK_DTO_PORT, useExisting: HttpTaskService }, { provide: ADD_TASK_DTO_PORT, useExisting: HttpTaskService }, { provide: GET_ALL_TASK_BY_EMPLOYEE_DTO_PORT, useExisting: HttpTaskService }, { provide: PUT_DONE_TASK_DTO_PORT, useExisting: HttpTaskService }, { provide: DELETE_TASK_DTO_PORT, useExisting: HttpTaskService }],
  exports: []
})
export class HttpTaskServiceModule {
}
