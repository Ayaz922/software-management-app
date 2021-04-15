import React, { useState, useEffect } from "react";
import { Dropdown, Menu } from "semantic-ui-react";
import { getTaskTypeText } from "../../utils/utils-functions";

const NestDropdown = (props) => {
  const [filterBy, setFilterBy] = useState({});
  const handleClick = (e, { type, value }) => {
    setFilterBy({ type: type, value: value });
  };

  useEffect(() => {
    props.onItemClicked(filterBy);
  }, [filterBy]);

  return (
    <Dropdown
      placeholder="Filter by"
      clearable
      selection
      text={
        filterBy.type === "TYPE"
          ? getTaskTypeText(filterBy.value)
          : filterBy.value
      }
    >
      <Dropdown.Menu>
        <Dropdown.Header>Task Type</Dropdown.Header>
        <Dropdown.Item type="TYPE" value="USER_STORY" onClick={handleClick}>
          User Story
        </Dropdown.Item>
        <Dropdown.Item type="TYPE" value="EPIC" onClick={handleClick}>
          Epic
        </Dropdown.Item>
        <Dropdown.Item type="TYPE" value="BUG" onClick={handleClick}>
          Bug
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Header>Priority</Dropdown.Header>
        <Dropdown.Item type="PRIORITY" value="LOW" onClick={handleClick}>
          Low
        </Dropdown.Item>
        <Dropdown.Item type="PRIORITY" value="MEDIUM" onClick={handleClick}>
          Medium
        </Dropdown.Item>
        <Dropdown.Item type="PRIORITY" value="HIGH" onClick={handleClick}>
          High
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NestDropdown;
