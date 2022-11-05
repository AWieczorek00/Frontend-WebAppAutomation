import { NgModule } from '@angular/core';
import { InMemoryClientStorage } from './in-memory-client.storage';
import { CLIENT_CONTEXT_PORT } from '../../../../application/ports/secondary/context/client/client.context-port';

@NgModule({
  imports: [],
  declarations: [],
  providers: [InMemoryClientStorage, { provide: CLIENT_CONTEXT_PORT, useExisting: InMemoryClientStorage }],
  exports: []
})
export class InMemoryClientStorageModule {
}
