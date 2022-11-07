import { NewOrderContext } from '../ports/secondary/context/new-order/new-order.context';
import { NewOrderQuery } from '../ports/primary/query/new-order.query';
import { ClientQuery } from '../ports/primary/query/client.query';
import { EmployeeQuery } from '../ports/primary/query/employee.query';

export const mapFromNewOrderContext = (
  context: NewOrderContext
): NewOrderQuery => {
  return new NewOrderQuery(
    context.clientList ?
      context.clientList.map(
        (client) =>
          new ClientQuery(
            client.id,
            client.name,
            client.nip,
            client.address,
            client.city,
            client.phoneNumber,
            client.email,
            client.type
          )
      ):[],
    context.employeeList.map(
      (employee) =>
        new EmployeeQuery(
          employee.individualId,
          employee.firstName,
          employee.secondName,
          employee.lastName,
          employee.pesel
        )
    )
  );
};
