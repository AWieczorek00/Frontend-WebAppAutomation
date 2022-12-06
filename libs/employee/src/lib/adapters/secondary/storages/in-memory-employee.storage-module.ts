import { NgModule } from '@angular/core';
import { InMemoryEmployeeStorage } from './in-memory-employee.storage';
import { EMPLOYEE_CONTEXT_PORT } from '../../../application/ports/secondary/context/employee/employee.context-port';

@NgModule({
  imports: [],
  declarations: [],
  providers: [InMemoryEmployeeStorage, { provide: EMPLOYEE_CONTEXT_PORT, useExisting: InMemoryEmployeeStorage }],
  exports: []
})
export class InMemoryEmployeeStorageModule {
}
