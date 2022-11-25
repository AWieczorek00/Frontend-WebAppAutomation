import { TaskQuery } from './task.query';

export class TaskListQuery {
  constructor(readonly taskList: TaskQuery[]) {}
}
