import { useState, useEffect } from "react";
import moment from "moment";
import { Form, Button, Modal } from "semantic-ui-react";
import { editTask, getTask } from "../../api/task-api";
import { getAllTeamMember, getDeveloperList } from "../../user/user-profile";
import { useHistory } from 'react-router-dom'
import TaskModel, { taskModel } from '../../models/task-model'
import {
  taskStatusOptions,
  priorityItems,
  labelsOptions,
  getTaskStatusByString,
  getTaskType as getTaskTypeByString,
  getPriorityByString,
} from "../../utils/general_data";
import { TaskStatus } from "../../models/tast-status";
import { Priority } from "../../models/priority";
import { TaskType } from "../../models/task-type";
import { apiCallback } from "../../models/api-callback-function";

const EditTaskComponent = () => {
  const id = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );

  const callback: apiCallback = (success: boolean, response: any) => {
    console.log(response);
    if (success) {
      console.log('Response Recieved', response);
      setValues(response);
    } else alert(response);
  };

  useEffect(() => {
    getTask(id, callback)
  }, [id]);


  const setValues = (task: TaskModel) => {
    console.log('Setting up values', task)
    setStatus(task.status);
    task.dueDate
      ? setDueDate(moment(task.dueDate).toDate())
      : setDueDate(undefined);

    setTitle(task.title);
    setDescription(task.description);
    setLables(task.lables);
    setPriority(task.priority);
    setTaskType(task.taskType);
    setAssignedUser(task.assignedUser);
  };

  let fileInputRef = {};
  const [errors, setErrors] = useState<any>({
    title: undefined,
    status: undefined,
    userType: undefined,
    priority: undefined,
  });

  const [successModalVisible, showSuccessModal] = useState(false);
  const [loading, showLoading] = useState(false);
  const history = useHistory()

  const allTeams = [];
  getDeveloperList((success, data) => {
    if(success){
    data.forEach((developer: any) => {
      allTeams.push({
        key: developer.username,
        text: developer.name,
        value: developer.name,
      });
    });
  }else {
    alert("Coudn't  load developer list")
  }
  })

  const validate = () => {
    if (title.trim() === "" || !title) {
      setErrors({ title: "Please enter title" });
      return false;
    } else setErrors({ title: undefined });

    if (taskType.trim() === "" || !taskType) {
      setErrors({ taskType: "Please select task type" });
      return false;
    } else setErrors({ taskType: undefined });

    if (priority.trim() === "" || !priority) {
      setErrors({ priority: "Please select priority" });
      return false;
    } else setErrors({ priority: undefined });

    return true;
  };

  const saveTask = () => {
    if (!validate()) return;
    taskModel._id = id
    taskModel.title = title;
    taskModel.description = description;
    taskModel.status = status;
    taskModel.dueDate = dueDate;
    taskModel.priority = priority;
    taskModel.assignedUser = assignedUser;
    taskModel.taskType = taskType;
    taskModel.lables = lables;
    showLoading(true);
    editTask(taskModel, (success, message, data) => {
      if (success) {
        showLoading(false);
        showSuccessModal(true);
        //Data is saved, show popup & clear form or close
      } else {
        showLoading(false);
        //Could'nt save data show error pop, don't clear
      }
    });
  };

  //States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState<string>();
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.BACKLOG);
  const [dueDate, setDueDate] = useState<Date>();
  const [priority, setPriority] = useState<Priority>(Priority.LOW);
  const [assignedUser, setAssignedUser] = useState<string>();
  const [taskType, setTaskType] = useState<TaskType>(TaskType.USER_STORY);
  const [lables, setLables] = useState<Array<string>>([]);
  const [attachments, setAttachments] = useState([]);

  return (
    <div>
      <Modal
        open={successModalVisible}
        header="Success!"
        content="Task saved successfully!"
        actions={[
          { key: "view", content: "View Task" },
          { key: "done", content: "Close", positive: true },
        ]}
        onActionClick={(e: any, data) => {
          console.log(e.target.innerHTML)
          console.log(data)
          if (e.target.innerHTML === 'View Task') {
            console.log('Opening task')
            history.push('/task/' + id)
          }

          showSuccessModal(false);
        }}
      />
      <Form style={{ padding: "1% 1%" }}>
        <h2>Add New User Story/Issue</h2>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Story / Issue Title"
            placeholder="Enter story/ issue name here"
            width={12}
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            error={errors.title}
          />
          <Form.Select
            label="Status"
            options={taskStatusOptions}
            placeholder="Select Status"
            value={status}
            onChange={(event, { value }) => {
              if (typeof value === 'string')
                setStatus(getTaskStatusByString(value));
            }}
            width={4}
          />
        </Form.Group>
        <Form.Group>
          <Form.Group width={12} inline error={errors.taskType}>
            <label>Type: </label>
            <Form.Radio
              label="User Story"
              value={TaskType.USER_STORY}
              checked={taskType === TaskType.USER_STORY}
              onChange={(e, { value }) => {
                if (typeof value === 'string')
                  setTaskType(getTaskTypeByString(value));
              }}
            />
            <Form.Radio
              label="Epic"
              value={TaskType.EPIC}
              checked={taskType === TaskType.EPIC}
              onChange={(e, { value }) => {
                if (typeof value === 'string')
                  setTaskType(getTaskTypeByString(value));
              }}
            />
            <Form.Radio
              label="Issue/Bug"
              value={TaskType.BUG}
              checked={taskType === TaskType.BUG}
              onChange={(e, { value }) => {
                if (typeof value === 'string')
                  setTaskType(getTaskTypeByString(value));
              }}
            />
          </Form.Group>
        </Form.Group>
        <div className="emptySpace" />
        <Form.Group fluid>
          <Form.Dropdown
            label="Priority"
            placeholder="Select Priority"
            options={priorityItems}
            value={priority}
            selection
            onChange={(e, { value }) => {
              if (typeof value === 'string')
                setPriority(getPriorityByString(value));
            }}
            error={errors.priority}
          />
          <Form.Dropdown
            label="Assign Developer"
            placeholder="Select Developer"
            selection
            clearable
            value={assignedUser}
            options={getAllTeamMember()}
            onChange={(e, { value }) => {
              if (typeof value === 'string')
                setAssignedUser(value);
            }}
          />

          <Form.Field>
            <label>Due Date</label>
            <Form.Input
              type="Date"
              value={moment(dueDate).format('yyyy-MM-DD')}
              onChange={(e: any) => {

                setDueDate(e.target.value);
              }}
            />
          </Form.Field>
        </Form.Group>
        <div className="emptySpace" />
        <Form.Dropdown
          label="Add Labels"
          placeholder="Labels"
          fluid
          multiple
          search
          selection
          options={labelsOptions}
          value={lables}
          onChange={(e, { text, value }) => {
            //@ts-ignore
            setLables(value);
          }}
        />

        <div className="emptySpace" />
        <Form.TextArea
          label="Description"
          placeholder="Give a brief description of the story/issue..."
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <div className="emptySpace" />
        <Form.Group fluid>
          <Form.Input ref={fileInputRef} type="file" hidden />
          <Form.Button
            icon="upload"
            onClick={() => {
              //@ts-ignore
              attachments.push(fileInputRef);
              setAttachments(attachments);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Button.Group>
            <Button primary onClick={saveTask} loading={loading}>
              Save
            </Button>
            <Button.Or />
            <Button>Cancel</Button>
          </Button.Group>
        </Form.Group>
      </Form>
    </div>
  );
};

export default EditTaskComponent;
