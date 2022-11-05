import { Injectable } from '@angular/core';
import {Observable, of, ReplaySubject} from 'rxjs';
import { ClientContextPort } from '../../../../application/ports/secondary/context/client/client.context-port';
import { ClientContext } from '../../../../application/ports/secondary/context/client/client.context';

@Injectable()
export class InMemoryClientStorage implements ClientContextPort {
  private _dataSubject: ReplaySubject<ClientContext> = new ReplaySubject<ClientContext>(1);
  private data$: Observable<ClientContext> = this._dataSubject.asObservable();

  select(): Observable<ClientContext> {
    return  this.data$
  }

  setState(context: ClientContext): Observable<void> {
    return of(this._dataSubject.next(context))
  }
}
