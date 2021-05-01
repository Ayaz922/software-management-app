import React, { useState, useEffect } from "react";
import { Checkbox, Form } from "semantic-ui-react";

const CustomFilter = (props) => {

  const [showOnlyMyTasks, setMyTasks] = useState(false)

  useEffect(() => {
    console.log("Console: UseEffect "+showOnlyMyTasks)
   
  }, [props.data, showOnlyMyTasks]);

  const handleItemClick = (e, { type, value }) => {
    console.log("Value: " + e.currentTarget.value + " Type: " + type);
    props.onItemClicked({
        type,
        value
    })
  };

  const toggleMyTasks = ()=>{
    props.onItemClicked({
      "type":"mytask",
      "value":!showOnlyMyTasks
    })
    setMyTasks(!showOnlyMyTasks)  
  }

  const filterDropdown = {
    type: [
      { key: 1, text: "User Story", value: "USER_STORY" },
      { key: 2, text: "Issue/Bug", value: "ISSUE" },
      { key: 3, text: "Epic", value: "EPIC" },
    ],
    status: [
      { key: 1, text: "Backlog", value: "BACKLOG" },
      { key: 2, text: "In Progress", value: "IN_PROGRESS" },
      { key: 3, text: "Done", value: "DONE" },
    ],
    priority: [
      { key: 1, text: "Low", value: "LOW" },
      { key: 2, text: "Medium", value: "MEDIUM" },
      { key: 3, text: "High", value: "HIGH" },
    ],
    assignee: [],
    sprint: [],
    pi: [],
    dueDate: [],
  };


  return (
    <div>
      <h4>Filter data by</h4>
      <Form size="mini">
        <Checkbox label="My tasks"
        checked={showOnlyMyTasks}
        onChange={toggleMyTasks}
        />
        <Form.Dropdown
          label="Task Type"
          type="type"
          placeholder="Task Type"
          clearable
          options={filterDropdown.type}
          selection
          onChange={handleItemClick}
        />
        <Form.Dropdown
          label="Status"
          type="status"
          placeholder="Status"
          clearable
          options={filterDropdown.status}
          selection
          onChange={handleItemClick}
        />
        <Form.Dropdown
          label="Priority"
          type="priority"
          placeholder="Priority"
          clearable
          options={filterDropdown.priority}
          selection
          onChange={handleItemClick}
        />
        <Form.Dropdown
          label="Assignee"
          type="assignee"
          placeholder="Assignee"
          clearable
          options={filterDropdown.assignee}
          selection
          onChange={handleItemClick}
        />
        <Form.Dropdown
          label="Sprint"
          type="sprint"
          placeholder="Sprint"
          clearable
          options={filterDropdown.sprint}
          selection
          onChange={handleItemClick}
        />
        <Form.Dropdown
          label="Due Date"
          type="dueDate"
          placeholder="Task Type"
          clearable
          options={filterDropdown.dueDate}
          selection
          onChange={handleItemClick}
        />
      </Form>
    </div>
  );
};

export default CustomFilter;
