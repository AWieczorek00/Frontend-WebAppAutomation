import { ClientContext } from '../ports/secondary/context/client/client.context';
import { ClientListQuery } from '../ports/primary/query/client-list.query';
import { ClientQuery } from '../ports/primary/query/client.query';

export const mapFormClientContext = (context: ClientContext): ClientListQuery =>
  new ClientListQuery(
    context.clientList.map(
      (client) =>
        new ClientQuery(
          client.id,
          client.name,
          client.nip,
          client.address,
          client.city,
          client.numberPhone,
          client.email,
          client.type
        )
    )
  );
