import { NgModule } from '@angular/core';
import { InMemoryEmployeeStorage } from './in-memory-employee.storage';
import { SELECT_EMPLOYEE_CONTEXT_PORT } from '../../../application/ports/secondary/context/employee/select-employee.context-port';
import { SET_STATE_EMPLOYEE_CONTEXT_PORT } from '../../../application/ports/secondary/context/employee/set-state-employee.context-port';

@NgModule({
  imports: [],
  declarations: [],
  providers: [InMemoryEmployeeStorage, { provide: SELECT_EMPLOYEE_CONTEXT_PORT, useExisting: InMemoryEmployeeStorage }, { provide: SET_STATE_EMPLOYEE_CONTEXT_PORT, useExisting: InMemoryEmployeeStorage }],
  exports: []
})
export class InMemoryEmployeeStorageModule {
}
