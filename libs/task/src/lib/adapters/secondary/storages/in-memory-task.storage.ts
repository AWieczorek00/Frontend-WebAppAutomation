import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { SelectTaskContextContextPort } from '../../../application/ports/secondary/context/task/select-task-context.context-port';
import { PatchTaskContextPort } from '../../../application/ports/secondary/context/task/patch-task.context-port';
import { TaskContext } from '../../../application/ports/secondary/context/task/task.context';

@Injectable()
export class InMemoryTaskStorage implements SelectTaskContextContextPort, PatchTaskContextPort {
  private _subject: Subject<Partial<TaskContext>> = new BehaviorSubject<Partial<TaskContext>>({});


  select(): Observable<TaskContext> {
    return this._subject.asObservable() as Observable<TaskContext>;
  }



  patch(patch: Partial<TaskContext>): Observable<void> {
    return this._subject.pipe(
      take(1),
      switchMap((context) => of(this._subject.next({ ...context, ...patch })))
    );
  }
}
