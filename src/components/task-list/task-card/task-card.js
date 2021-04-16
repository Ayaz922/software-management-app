import React, { useState, useEffect } from "react";
import { Card } from "semantic-ui-react";
import { assignTaskToMe } from "../../../api/task-api";
import {
  getTaskTypeText,
  getColorForPriority,
} from "../../../utils/utils-functions";

const TaskCard = (props) => {
  const [taskModel, updateTaskModel] = useState(props.task);

  const enableAssignMe = (taskModel) => {
    if (!taskModel.assignedUser) {
      return (
        <a
          onClick={() => handleAssignMe(taskModel)}
          style={{ color: "blue", padding: "0 8px" }}
        >
          Assign to Me
        </a>
      );
    }
    return;
  };

  const handleAssignMe = (taskModel) => {
    assignTaskToMe(taskModel, (success, message, data) => {
      updateTaskModel(data);
      props.updateData();
    });
  };

  //Use effect to listen to any changes from the parent
  useEffect(() => {
    updateTaskModel(props.task);
  }, [props]);

  return (
    <Card fluid size="mini">
      <Card.Content>
        <a
          style={{
            float: "right",
            color: getColorForPriority(taskModel.priority),
          }}
        >
          {taskModel.priority}
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

        <Card.Header style={{ fontSize: "14px" }}>
          <a style={{ padding: "0px 10px 0px 0px" }}>
            #{taskModel._id.substring(20, 24)}
          </a>
          {taskModel.title}
        </Card.Header>
        <Card.Meta inline>
          <p>{getTaskTypeText(taskModel.taskType)}</p>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <i className="ui icon user"></i>
        {taskModel.assignedUser ? taskModel.assignedUser : "Not Assigned"}
        {enableAssignMe(taskModel)}
        <a style={{ color: "#525252", padding: "0 8px", float: "right" }}>
          Status:
          {" " + taskModel.status}
        </a>
        <a
          style={{
            padding: "0px 10px 0px 0px",
            float: "right",
            color: "#525252",
          }}
        >
          <i className="ui icon calendar alternate outline"></i>
          {taskModel.dueDate
            ? new Date(taskModel.dueDate).toLocaleDateString()
            : "NA"}
        </a>
      </Card.Content>
    </Card>
  );
};

export default TaskCard;
