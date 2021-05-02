import React, { useState, useEffect } from "react";
import { Checkbox, Form } from "semantic-ui-react";
import { priorityItems, taskStatusOptions, taskTypeOptions } from "../../utils/general_data";

type PropType={
  onItemClicked:(filterItem:FilterType)=>void
}

type FilterType={
  type:string,
  value:string | undefined | boolean
}


const CustomFilter = ({onItemClicked}:PropType) => {

  const [showOnlyMyTasks, setMyTasks] = useState(false)

  useEffect(() => {
    console.log("Console: UseEffect "+showOnlyMyTasks)
   
  }, [showOnlyMyTasks]);

  const handleItemClick = (e:any, { type, value }:FilterType) => {
    onItemClicked({
        type,
        value
    })
  };

  const toggleMyTasks = ()=>{
    onItemClicked({
      "type":"mytask",
      "value":!showOnlyMyTasks
    })
    setMyTasks(!showOnlyMyTasks)  
  }

  const filterDropdown = {
    type: taskTypeOptions,
    status: taskStatusOptions,
    priority: priorityItems,
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
          //@ts-ignore
          onChange={handleItemClick}
        />
        <Form.Dropdown
          label="Status"
          type="status"
          placeholder="Status"
          clearable
          options={filterDropdown.status}
          selection
          //@ts-ignore
          onChange={handleItemClick}
        />
        <Form.Dropdown
          label="Priority"
          type="priority"
          placeholder="Priority"
          clearable
          options={filterDropdown.priority}
          selection
          //@ts-ignore
          onChange={handleItemClick}
        />
        <Form.Dropdown
          label="Assignee"
          type="assignee"
          placeholder="Assignee"
          clearable
          options={filterDropdown.assignee}
          selection
          //@ts-ignore
          onChange={handleItemClick}
        />
        <Form.Dropdown
          label="Sprint"
          type="sprint"
          placeholder="Sprint"
          clearable
          options={filterDropdown.sprint}
          selection
          //@ts-ignore
          onChange={handleItemClick}
        />
        <Form.Dropdown
          label="Due Date"
          type="dueDate"
          placeholder="Task Type"
          clearable
          options={filterDropdown.dueDate}
          selection
          //@ts-ignore
          onChange={handleItemClick}
        />
      </Form>
    </div>
  );
};

export default CustomFilter;
