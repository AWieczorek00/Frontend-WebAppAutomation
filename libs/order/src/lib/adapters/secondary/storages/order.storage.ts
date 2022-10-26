import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, of } from 'rxjs';
import { SetsStateOrderContextPort } from '../../../application/ports/secondary/context/sets-state-order.context-port';
import { SelectOrderContextPort } from '../../../application/ports/secondary/context/select-order.context-port';
import { OrderContext } from '../../../application/ports/secondary/context/order.context';

@Injectable()
export class OrderStorage implements SetsStateOrderContextPort, SelectOrderContextPort {
  private _subject: Subject<OrderContext> = new ReplaySubject<OrderContext>(1);
  setState(state: OrderContext): Observable<void> {
    return of(this._subject.next(state));
  }

  select(): Observable<OrderContext> {
    return this._subject.asObservable() as Observable<OrderContext>
  }
}
