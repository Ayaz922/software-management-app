import React, { useState } from "react";
import { Form, Button, Modal } from "semantic-ui-react";
import TaskModel from "../../models/task-model";
import { addTask } from "../../api/task-api";
import {getDeveloperList} from "../../user/user-profile"

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
      text: "Improvement",
      value: "value",
    },
    {
      key: "l1",
      text: "UI",
      value: "l1",
    },
    {
      key: "l2",
      text: "Backend",
      value: "l2",
    },
    {
      key: "l3",
      text: "Cloud",
      value: "l3",
    },
    {
      key: "l4",
      text: "Performance",
      value: "l4",
    },
    {
      key: "l5",
      text: "Urgent",
      value: "l5",
    },
  ];

  const [errors, setErrors] = useState({
    title: undefined,
    status: undefined,
    userType: undefined,
    priority: undefined,
  });

  const [successModalVisible,showSuccessModal] = useState(false)
  const [loading,showLoading] = useState(false)


  const allTeams = []
  getDeveloperList().forEach((developer)=>{
    allTeams.push({
      key: developer.email,
      text: developer.name,
      value: developer.name,
    })
  })

  const priorityItems = [
    {
      key: "Low",
      text: "Low",
      value: "LOW",
      image: {
        avatar: true,
        src: "https://www.iconsdb.com/icons/preview/green/circle-xxl.png",
        size:'tiny'
      },
    },
    {
      key: "medium",
      text: "Medium",
      value: "Medium",
      image: {
        avatar: true,
        src: "https://www.iconsdb.com/icons/preview/royal-blue/circle-xxl.png",
        size:'tiny'
      },
    },
    {
      key: "high",
      text: "High",
      value: "HIGH",
      image: {
        avatar: true,
        src: "https://www.iconsdb.com/icons/preview/red/circle-xxl.png",
        size:'tiny'
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
    showLoading(true)
    addTask(TaskModel, (success, message, data) => {
      if (success) {
        showLoading(false)
        showSuccessModal(true)
        clearForm()
        //Data is saved, show popup & clear form or close
      } else {
        showLoading(false)
        //Could'nt save data show error pop, don't clear
      }
    });
  };

  const clearForm = ()=>{
    setTitle('')
    setDescription('')
    setStatus('')
    setDueDate('')
    setPriority('')
    setAssignedUser('')
    setTaskType('USER_STORY')
    setLables([])
  };


  //States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState('');
  const [assignedUser, setAssignedUser] = useState("");
  const [taskType, setTaskType] = useState("USER_STORY");
  const [lables, setLables] = useState([]);
  const [attachments,setAttachments] = useState([])
  // const [comments, setComments] = useState([]);
  // const [attachments, setAttachments] = useState([]);

  return (
    <div>
    <Modal
      open={successModalVisible}
      header='Success!'
      content='Task saved successfully!'
      actions={[{ key: 'view', content: 'View Task'}, { key: 'done', content: 'Close', positive: true }]}
      onActionClick={(e,data)=>{
        console.log(e.target.innerHTML)
        showSuccessModal(false)
      }
      }
    />
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
          value={assignedUser}
          options={allTeams}
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
        <Form.Button icon="upload" onClick={()=>{
          attachments.push(fileInputRef)
          setAttachments(attachments)
        }
        }/>
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
