import { Priority } from "./priority";
import { TaskType } from "./task-type";
import { TaskStatus } from "./tast-status";

export default interface TaskModel  {
  _id: string | undefined | null,
  title: string,
  projectId: string | undefined | null,
  description: string | undefined,
  status: TaskStatus,
  creator: string | undefined,
  dueDate: undefined | Date | null,
  priority: Priority,
  assignedUser: string | undefined,
  assignedBy: string | undefined,
  taskType: TaskType,
  lables: Array<any>,
  comments: Array<any>,
  attachments: [] | undefined | null,
  createdBy?:string,
  createdAt?:Date | string
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
  assignedUser:undefined,
  assignedBy:undefined,
  taskType:TaskType.USER_STORY,
  lables:[],
  comments:[],
  attachments:undefined

}
export {taskModel}