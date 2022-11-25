import { Injectable } from '@angular/core';
import {Observable, of, ReplaySubject, Subject} from 'rxjs';
import { SelectEmployeeContextPort } from '../../../application/ports/secondary/context/employee/select-employee.context-port';
import { SetStateEmployeeContextPort } from '../../../application/ports/secondary/context/employee/set-state-employee.context-port';
import { EmployeeContext } from '../../../application/ports/secondary/context/employee/employee.context';
import {OrderContext} from "../../../../../../order/src/lib/application/ports/secondary/context/order/order.context";

@Injectable()
export class InMemoryEmployeeStorage implements SelectEmployeeContextPort, SetStateEmployeeContextPort {
  private _subject: Subject<EmployeeContext> = new ReplaySubject<EmployeeContext>(1);

  select(): Observable<EmployeeContext> {
    return this._subject.asObservable() as Observable<EmployeeContext>
  }

  setState(state: EmployeeContext): Observable<void> {
    return of(this._subject.next(state));
  }
}

