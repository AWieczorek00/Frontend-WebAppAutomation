import { ClientQuery } from './client.query';

export class ClientListQuery {
  constructor(public readonly clientList: ClientQuery[]) {}
}
