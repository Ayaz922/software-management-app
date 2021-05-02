import React, { useState, useEffect } from "react";
import moment from "moment";
import { Form, Button, Modal } from "semantic-ui-react";
import { editTask, getTask } from "../../api/task-api";
import { getAllTeamMember, getDeveloperList } from "../../user/user-profile";
import {useHistory} from 'react-router-dom'
import {taskModel} from '../../models/task-model'
import {
  taskStatusOptions,
  priorityItems,
  labelsOptions,
} from "../../utils/general_data";

const EditTaskComponent = (props) => {
  const id = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );

  const callback = (success, response) => {
    console.log(response);
    if (success) {
      console.log('Response Recieved',response);
      setTask(response);
      setValues(response);
    } else alert(response);
  };

  useEffect(() => {
    getTask(id, callback)
  }, [id]);


  const setValues = (task) => {
    console.log('Setting up values',task)
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
  const [errors, setErrors] = useState({
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

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setStatus("");
    setDueDate("");
    setPriority("");
    setAssignedUser("");
    setTaskType("USER_STORY");
    setLables([]);
  };

  //States
  const [task, setTask] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [taskType, setTaskType] = useState("USER_STORY");
  const [lables, setLables] = useState([]);
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
        onActionClick={(e, data) => {
          console.log(e.target.innerHTML)
          console.log(data)
          if(e.target.innerHTML === 'View Task'){
            console.log('Opening task')
            history.push('/task/'+id)
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
              setStatus(value);
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
                setTaskType(value);
              }}
            />
            <Form.Radio
              label="Epic"
              value="EPIC"
              checked={taskType === "EPIC"}
              onChange={(e, { value }) => {
                setTaskType(value);
              }}
            />
            <Form.Radio
              label="Issue/Bug"
              value="ISSUE"
              checked={taskType === "ISSUE"}
              onChange={(e, { value }) => {
                setTaskType(value);
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
              setPriority(value);
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
              value={moment(dueDate).format('yyyy-MM-DD')}
              onChange={(e) => {
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
            console.log(value);
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

export default EditTaskComponent;
