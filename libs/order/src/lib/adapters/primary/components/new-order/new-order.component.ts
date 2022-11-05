import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { ClientListQuery } from '../../../../application/ports/primary/query/client-list.query';
import {
  GETS_CURRENT_CLIENT_LIST_QUERY_PORT,
  GetsCurrentClientListQueryPort,
} from '../../../../application/ports/primary/query/gets-current-client-list.query-port';
import { FormControl } from '@angular/forms';
import { ClientQuery } from '../../../../application/ports/primary/query/client.query';

@Component({
  selector: 'lib-new-order',
  styleUrls: ['./new-order.component.scss'],
  templateUrl: './new-order.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewOrderComponent {
  readonly client$: Observable<ClientListQuery> =
    this._getsCurrentClientListQueryPort.getCurrentClientList();

  constructor(
    @Inject(GETS_CURRENT_CLIENT_LIST_QUERY_PORT)
    private _getsCurrentClientListQueryPort: GetsCurrentClientListQueryPort
  ) {
    this.client$.subscribe((data) => (this.clientQueries = data.clientList));
  }

  myControl = new FormControl('');
  clientQueries: ClientQuery[] = [];
  filteredClient: Observable<ClientQuery[]> | undefined;
  disableSelect = new FormControl(false);

  getOptionText(clientQueries:ClientQuery) {
    return clientQueries.name;
  }

  ngOnInit() {
    this.filteredClient = this.myControl.valueChanges.pipe(
      startWith(''),
      // map((value) => this._filter(value || ''))
      map((client) =>
        client ? this._filter(client) : this.clientQueries.slice()
      )
    );
  }

  private _filter(value: ClientQuery): ClientQuery[] {
    const filterValue = value.name.toLowerCase();

    return this.clientQueries.filter((client) =>
      client.name.toLowerCase().includes(filterValue)
    );
  }

  getPosts(value: any) {
    console.log(value);
  }
}
