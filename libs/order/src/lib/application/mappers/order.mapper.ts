import { OrderContext } from '../ports/secondary/context/order/order.context';
import { OrderListQuery } from '../ports/primary/query/order-list.query';
import { OrderQuery } from '../ports/primary/query/order.query';
import { EmployeeQuery } from '../ports/primary/query/employee.query';
import { ActivitiesQuery } from '../ports/primary/query/activities.query';

export const mapFromOrderContext = (context: OrderContext): OrderListQuery =>
  new OrderListQuery(
    context.orderList.map(
      (order) =>
        new OrderQuery(
          order.id,
          order.employeeList
            ? order.employeeList.map(
                (employeeDto) =>
                  new EmployeeQuery(
                    employeeDto.individualId,
                    employeeDto.firstName,
                    employeeDto.secondName,
                    employeeDto.lastName,
                    employeeDto.pesel
                  )
              )
            : [],
          order.client,
          order.activitiesList
            ? order.activitiesList.map(
                (activities) =>
                  new ActivitiesQuery(
                    activities.id,
                    activities.name,
                    activities.attention,
                    activities.done
                  )
              )
            : [],
          order.dateOfAdmission,
          order.dateOfExecution,
          order.priority,
          order.status,
          order.period,
          order.note
        )
    )
  );
