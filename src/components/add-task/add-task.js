import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import TaskModel from "../../models/task-model";
import { addTask } from "../../api/task-api";

const AddTaskComponent = () => {
  let fileInputRef = {};

  const options = [
    { key: "bl", text: "Backlog", value: "BACKLOG" },
    { key: "ip", text: "In Progress", value: "ON_GOING" },
    { key: "dn", text: "Completed", value: "COMPLETED" },
  ];

  const labels = [
    {
      key: "key",
      text: "Label 1",
      value: "value",
    },
    {
      key: "l1",
      text: "Label 2",
      value: "l1",
    },
    {
      key: "l2",
      text: "Lable 3",
      value: "l2",
    },
    {
      key: "l3",
      text: "Label 4",
      value: "l3",
    },
    {
      key: "l4",
      text: "Label 5",
      value: "l4",
    },
    {
      key: "l5",
      text: "Label 6",
      value: "l5",
    },
  ];

  const [errors, setErrors] = useState({
    title: undefined,
    status: undefined,
    userType: undefined,
    priority: undefined,
  });

  const allTeams = [
    {
      key: "Jenny Hess",
      text: "Jenny Hess",
      value: "Jenny Hess",
      image: {
        avatar: true,
        src: "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
      },
    },
  ];

  const priorityItems = [
    {
      key: "Low",
      text: "Low",
      value: "LOW",
      image: {
        avatar: true,
        src: "https://react.semantic-ui.com/images/avatar/small/jenny.jpg",
      },
    },
  ];

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

    TaskModel.title = title;
    TaskModel.description = description;
    TaskModel.status = status;
    TaskModel.dueDate = dueDate;
    TaskModel.priority = priority;
    TaskModel.assignedUser = assignedUser;
    TaskModel.taskType = taskType;
    TaskModel.lables = lables;

    addTask(TaskModel, (success, message, data) => {
      if (success) {
        //Data is saved, show popup & clear form or close
      } else {
        //Could'nt save data show error pop, don't clear
      }
    });
  };

  //States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [taskType, setTaskType] = useState("USER_STORY");
  const [lables, setLables] = useState([]);
  // const [comments, setComments] = useState([]);
  // const [attachments, setAttachments] = useState([]);

  return (
    <Form style={{padding:"1% 1%"}}>
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
          options={options}
          placeholder="Select Status"
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
          options={allTeams}
          onChange={(e, { value }) => {
            setAssignedUser(value);
          }}
        />

        <Form.Field>
          <label>Due Date</label>
          <Form.Input
            type="Date"
            placeholder="00/00/0000"
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
        options={labels}
        value={lables}
        onChange={(e, { value }) => {
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
        <Form.Button icon="upload" />
      </Form.Group>
      <div className="emptySpace" />
      <Form.Group>
        <Button.Group>
          <Button primary onClick={saveTask}>
            Save
          </Button>
          <Button.Or />
          <Button>Cancel</Button>
        </Button.Group>
      </Form.Group>
    </Form>
  );
};

export default AddTaskComponent;
