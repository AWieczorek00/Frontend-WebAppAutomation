import { NgModule } from '@angular/core';
import { InMemoryTaskStorage } from './in-memory-task.storage';
import { SELECT_TASK_CONTEXT_CONTEXT_PORT } from '../../../application/ports/secondary/context/task/select-task-context.context-port';
import { PATCH_TASK_CONTEXT_PORT } from '../../../application/ports/secondary/context/task/patch-task.context-port';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    InMemoryTaskStorage,
    {
      provide: SELECT_TASK_CONTEXT_CONTEXT_PORT,
      useExisting: InMemoryTaskStorage,
    },
    { provide: PATCH_TASK_CONTEXT_PORT, useExisting: InMemoryTaskStorage },
  ],
  exports: [],
})
export class InMemoryTaskStorageModule {}
