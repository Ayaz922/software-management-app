import { useState } from "react";
import { Form, Button, Modal } from "semantic-ui-react";
import { addTask } from "../../api/task-api";
import { getAllTeamMember, getDeveloperList } from "../../user/user-profile";
import { useHistory } from 'react-router-dom'
import { getPriorityByString, getProjectId, getTaskStatusByString, getTaskType, labelsOptions, priorityItems, taskStatusOptions } from "../../utils/general_data";
import {taskModel} from '../../models/task-model'
import { TaskStatus } from "../../models/tast-status";
import { Priority as TaskPriority } from "../../models/priority";
import { TaskType } from "../../models/task-type";
import moment from "moment";

const AddTaskComponent = () => {
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
  getDeveloperList().forEach((developer) => {
    allTeams.push({
      key: developer.email,
      text: developer.name,
      value: developer.name,
    });
  });



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
    taskModel.title = title;
    taskModel.description = description;
    taskModel.status = status;
    taskModel.dueDate = dueDate;
    taskModel.priority = priority;
    taskModel.assignedUser = assignedUser;
    taskModel.taskType = taskType;
    taskModel.lables = lables;
    taskModel.projectId = getProjectId()
    showLoading(true);
    addTask(taskModel, (success, data, message) => {
      if (success) {
        showLoading(false);
        showSuccessModal(true);
        taskModel._id = data._id;
        console.log(taskModel._id)
        clearForm();
        //Data is saved, show popup & clear form or close
      } else {
        showLoading(false);
        //Could'nt save data show error pop, don't clear
      }
    });
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setStatus(TaskStatus.BACKLOG);
    setDueDate(undefined);
    setPriority(TaskPriority.LOW);
    setAssignedUser("");
    setTaskType(TaskType.USER_STORY);
    setLables([]);
  };

  //States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.BACKLOG);
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.LOW);
  //TODO: Check for type of assigned user
  const [assignedUser, setAssignedUser] = useState<any>("");
  const [taskType, setTaskType] = useState<any>(TaskType.USER_STORY);
  const [lables, setLables] = useState<any>([]);
  const [attachments, setAttachments] = useState<any>([]);

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
        onActionClick={(e:any) => {
          console.log('Event log',e)
          console.log(taskModel._id);
          if (e.target.innerHTML === "View Task" && taskModel._id) history.push("/task/" + taskModel._id);
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
              if (value)
                setStatus(getTaskStatusByString(value.toString()));
            }}
            width={4}
          />
        </Form.Group>
        <Form.Group>
          <Form.Group width={12} inline error={errors.taskType}>
            <label>Type: </label>
            <Form.Radio
              label="User Story"
              value="USER_STORY"
              checked={taskType === "USER_STORY"}
              onChange={(e, { value }) => {
                if (value && typeof (value) === 'string')
                  setTaskType(getTaskType(value));
              }}
            />
            <Form.Radio
              label="Epic"
              value="EPIC"
              checked={taskType === "EPIC"}
              onChange={(e, { value }) => {
                if (value && typeof (value) === 'string')
                  setTaskType(getTaskType(value));
              }}
            />
            <Form.Radio
              label="Issue/Bug"
              value="ISSUE"
              checked={taskType === "ISSUE"}
              onChange={(e, { value }) => {
                if (value && typeof (value) === 'string')
                  setTaskType(getTaskType(value));
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
              if (value && typeof (value) === 'string')
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
              setAssignedUser(value);
            }}
          />

          <Form.Field>
            <label>Due Date</label>
            <Form.Input
              type="Date"
              value={dueDate}
              placeholder="00/00/0000"
              onChange={(e) => {
                setDueDate(moment(e.target.value).toDate());
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
            console.log(text);
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

export default AddTaskComponent;
