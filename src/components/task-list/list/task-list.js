import React, { useState, useEffect } from "react";
import { CardGroup, Menu, Dropdown } from "semantic-ui-react";
import { getAllTask } from "../../../api/task-api";
import { getCurrentUser } from "../../../user/user-profile";
import NestDropdown from "../../nested-dropdown/nested-dropdown";
import TaskCard from "../task-card/task-card";

const TaskList = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [shouldUpdateData, setShouldUpdateData] = useState(false);
  const [activeItem, setActiveItem] = useState("alltasks");
  const [clearSelection,setClearSelection] = useState(false)

  const filterOptions = [
    { key: "user", text: "Assigned User", value: "user" },
    { key: "type", text: "Task type", value: "type" },
    { key: "priority", text: "priority", value: "priority" },
  ];

  let cards = [];

  const callback = (success, message, data) => {
    if (success) {
      setOriginalData(data);
      setFilteredList(data);
    } else {
      console.log("ERROR WHILE FETCHING THE DATA: " + message);
    }
  };
  console.log("Rendered");
  useEffect(() => {
    if (originalData.length === 0 || shouldUpdateData) {
      console.log("Console: Updating the data: " + shouldUpdateData);
      getAllTask(callback);
      setShouldUpdateData(false);
    }
  }, [filteredList, shouldUpdateData]);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    if (name == "alltasks") {
      setFilteredList(originalData);
    } else if (name == "mytasks") {
      const newArray = originalData.filter((item) => {
        return item.assignedUser === getCurrentUser();
      });
      setFilteredList(newArray);
    }
  };

  const onDropdownItemClicked = (item) => {
    if (item.type === "TYPE") {
      const newArray = originalData.filter((task) => {
        return task.taskType === item.value;
      });
      console.log(newArray);
      setFilteredList(newArray);
    } else {
      const newArray = originalData.filter((task) => {
        return task.priority === item.value;
      });
      console.log(newArray);
      setFilteredList(newArray);
    }
  };

  const dataUpdateCallback = () => {
    setShouldUpdateData(true);
  };

  for (const [index, value] of filteredList.entries()) {
    cards.push(
      <TaskCard key={index} task={value} updateData={dataUpdateCallback} />
    );
  }
  const filterByData = {
    users: [],
    type: [],
    priority: [],
  };

  // filteredList.forEach(task => {
  //   filterByData.users.push({ key: task.assignedUser, text: task.assignedUser, value: task.assignedUser })
  //   filterByData.type.push({ key: task.taskType, text: task.taskType, value: task.taskType })
  //   filterByData.priority.push({ key: task.priority, text: task.priority, value: task.priority })
  // });

  return (
    <div>
      <Menu secondary borderless={true} fluid>
        <Menu.Item
          name="alltasks"
          active={activeItem === "alltasks"}
          content="All Tasks"
          onClick={handleItemClick}
        />

        <Menu.Item
          name="mytasks"
          active={activeItem === "mytasks"}
          content="My Task"
          onClick={handleItemClick}
        />

        <Menu.Item name="filters" active={activeItem === "filters"}>
          {/* <Dropdown
            clearable
            selection
            options={filterOptions}
            placeholder="Filter Data by"
          /> */}

          <NestDropdown onItemClicked={onDropdownItemClicked} clearSelection={clearSelection} />
          <div className="padHorizontal" />
          {/* <Dropdown
            fluid
            multiple
            selection
            floated="right"
            options={filterByData.users}
            placeholder="Filter by user"
          /> */}
        </Menu.Item>
      </Menu>
      <CardGroup>{cards}</CardGroup>
    </div>
  );
};

export default TaskList;
