import { Priority } from "./priority";
import { TaskType } from "./task-type";
import { TaskStatus } from "./tast-status";

export default interface TaskModel  {
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
  attachments: [] | undefined | null,
};

let taskModel:TaskModel={
  _id:undefined,
  title:'',
  projectId:undefined,
  description:undefined,
  status:TaskStatus.BACKLOG,
  creator:undefined,
  dueDate:undefined,
  priority:Priority.LOW,
  assignee:undefined,
  assignedUser:undefined,
  taskType:TaskType.USER_STORY,
  lables:[],
  comments:[],
  attachments:undefined

}
export {taskModel}