import React, { useState } from "react";
import { Card } from "semantic-ui-react";

const TaskCard = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const enableAssignMe = (assignedUser) => {
    if (!assignedUser) {
      return <a style={{ color: "blue", padding: "0 8px" }}>Assign to Me</a>;
    }
    return;
  };

  const getTaskTypeText = (taskType) => {
    if (taskType === "BUG") return "Issue/Bug";
    if (taskType === "EPIC") return "Epic";
    return "User story";
  };

  const getColorForPriority = (priority) => {
    if (priority === "HIGH") return "red";
    if (priority === "LOW") return "green";
    return "blue";
  };

  return (
    <Card fluid>
      <Card.Content>
        <a
          style={{
            float: "right",
            color: getColorForPriority(props.task.priority),
          }}
        >
          {props.task.priority}
        </a>
        <a
          style={{
            padding: "0px 10px 0px 0px",
            float: "right",
            color: "#525252",
          }}
        >
          Priority:
        </a>

        <Card.Header style={{fontSize:"14px"}}>
          <a style={{ padding: "0px 10px 0px 0px" }}>#{props.task._id.substring(20,24)}</a>
          {props.task.title}
        </Card.Header>
        <Card.Meta>{props.task.taskType}</Card.Meta>
        <Card.Description>{props.task.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        Assigned User:{" "}
        {props.task.assignedUser ? props.task.assignedUser : "Not Assigned"}
        {enableAssignMe(props.task.assignedUser)}
        <a style={{ color: "#525252", padding: "0 8px", float: "right" }}>
          Assigned By:{" "}
          {props.task.assignee ? props.task.assignee : "Not Assigned yet"}
        </a>
      </Card.Content>
      <Card.Content inline extra>
        <a style={{ padding: "0px 10px 0px 0px", color: "grey" }}>
          Created on: {new Date(props.task.createdAt).toLocaleDateString()}
        </a>
        <a
          style={{
            padding: "0px 10px 0px 0px",
            float: "right",
            color: "#525252",
          }}
        >
          Due Date: {props.task.dueDate ? new Date(props.task.dueDate).toLocaleDateString() : "NA"}
        </a>
      </Card.Content>
    </Card>
  );
};

export default TaskCard;
