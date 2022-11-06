import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { NewOrderContextPort } from '../../../application/ports/secondary/context/new-order/new-order.context-port';
import { NewOrderContext } from '../../../application/ports/secondary/context/new-order/new-order.context';

@Injectable()
export class InMemoryNewOrderStorage implements NewOrderContextPort {
  private _subject: Subject<Partial<NewOrderContext>> = new BehaviorSubject<Partial<NewOrderContext>>({});

  patch(state: Partial<NewOrderContext>): Observable<void> {
    return this._subject.pipe(
      take(1),
      switchMap((context) => of(this._subject.next({ ...context, ...state })))
    );
  }

  select(): Observable<NewOrderContext> {
    return this._subject.asObservable() as Observable<NewOrderContext>;
  }
}
