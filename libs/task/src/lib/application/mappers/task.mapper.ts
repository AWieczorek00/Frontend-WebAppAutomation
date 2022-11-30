import { TaskContext } from '../ports/secondary/context/task/task.context';
import { TaskListQuery } from '../ports/primary/query/task/task-list.query';
import { TaskQuery } from '../ports/primary/query/task/task.query';

export const mapFromTaskContext = (context: TaskContext): TaskListQuery =>
  new TaskListQuery(
    context.taskList.map(
      (task) =>
        new TaskQuery(task.id, task.name,task.done, task.executionTime, task.employee)
    )
  );
