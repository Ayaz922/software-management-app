import { Priority } from "./priority";
import { TaskType } from "./task-type";
import { TaskStatus } from "./tast-status";

export interface TaskModel  {
  _id: string | undefined | null,
  title: string,
  projectId: string | undefined,
  description: string | undefined,
  status: TaskStatus,
  creator: string | undefined,
  dueDate: undefined | Date | null,
  priority: Priority,
  assignee: string | undefined,
  assignedUser: string | undefined,
  taskType: TaskType,
  lables: Array<any>,
  comments: Array<any>,
  attachments: string | undefined | null,
};
export default TaskModel;
