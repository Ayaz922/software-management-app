import { useState, useEffect } from "react";

import {
  Divider,
  Grid,
  Icon,
  Label,
  List,
  Button,
  Modal,
  Form,
} from "semantic-ui-react";
import { assignTaskToMe, assignTaskToUser, getTask } from "../../api/task-api";
import { getAllTeamMember } from "../../user/user-profile";
import {
  getColorForPriority,
  getTaskTypeText,
  getRandomColor,
} from "../../utils/utils-functions";
import CommentComponent from "../comments/comments";

const DetailedTaskComponent = () => {
  const id = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );

  const [task, setTask] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [reloadPage, setReloadPage] = useState(false);
  const [assignedUser, setAssignedUser] = useState();

  useEffect(() => {
    getTask(id, callback);
    setReloadPage(false);
  }, [id, reloadPage]);

  const floatRight = {
    float: "right",
  };

  const assignTaskToMeModal = () => {
    generateModal(
      "Alert!",
      "Are you sure you want to assign this task to you?",
      () => {
        assignTaskToMe(task, (success, message, data) => {
          if (success) {
            setReloadPage(true);
            console.log(message);
          } else {
            alert(message + " " + data);
          }
        });
      }
    );
    setShowModal(true);
  };

  const assignTaskToUserModal = () => {
    if (!assignedUser) return alert("Please select a user first!");

    generateModal(
      "Alert!",
      `Are you sure you want to assign this task to ${assignedUser}?`,
      () => {
        assignTaskToUser(task, assignedUser, (success, message, data) => {
          if (success) setReloadPage(true);
          else alert(message + " " + data);
        });
      }
    );
    setShowModal(true);
  };

  const generateModal = (header, content, action) => {
    let modal = {};
    modal.header = header;
    modal.content = content;
    modal.action = action;
    console.log(modal);
    setModalContent(modal);
  };

  const callback = (success, response) => {
    console.log(response);
    if (success) setTask(response);
    else alert(response);
  };

  let lables = [];
  if (task.lables && task.lables.length > 0)
    task.lables.forEach((lable) => {
      lables.push(
        <Label
          size="tiny"
          key={lable}
          content={lable}
          color={getRandomColor()}
          tag
        />
      );
    });

  if (lables.length === 0) {
    lables.push(<div>No Lable available</div>);
  }

  return (
    <>
      <Modal
        size="mini"
        open={showModal}
        header={modalContent.header}
        content={modalContent.content}
        actions={[
          { key: "view", content: "Yes" },
          { key: "done", content: "Cancel", positive: true },
        ]}
        onActionClick={(e, data) => {
          if (e.target.innerHTML === "Yes") modalContent.action();
          setShowModal(false);
        }}
      />
      <Grid style={{ padding: "10px 10px 0px 10px" }}>
        {/* Left Section */}
        <Grid.Column width={12}>
          <span>ID: #{id.substring(20, 24)}</span>
          <h3>{task.title}</h3>
          <span>Description: {task.description}</span>
          <h5>Lables</h5>
          {lables}
          <Divider hidden />
          <CommentComponent
            comments={task.comments}
            taskId={task._id}
            forceReload={() => {
              setReloadPage(true);
            }}
          />
        </Grid.Column>
        {/* Right section */}
        <Grid.Column width={4} style={{ height: "100%" }}>
          <List verticalAlign="middle">
            <List.Item>
              <Label style={floatRight} fluid color="blue" size="medium">
                Type
                <Label.Detail>{getTaskTypeText(task.taskType)}</Label.Detail>
              </Label>
            </List.Item>
            <List.Item>
              <Label
                fluid
                style={floatRight}
                color={getColorForPriority(task.priority)}
                size="medium"
              >
                Priority
                <Label.Detail>{task.priority}</Label.Detail>
              </Label>
            </List.Item>
            <List.Item>
              <Label
                style={floatRight}
                color="purple" //getColor should be dynamic need to decide
                size="medium"
              >
                Status
                <Label.Detail>{task.status}</Label.Detail>
              </Label>
            </List.Item>
            <Divider hidden />

            <Divider hidden />
            <List.Item>
              <div style={floatRight}>
                Due date &nbsp;
                <Icon name="calendar alternate outline" />
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "NA"}
              </div>
            </List.Item>
            <List.Item>
              <div style={floatRight}>
                Created At &nbsp;
                <Icon name="calendar alternate outline" />
                {task.createdAt
                  ? new Date(task.createdAt).toLocaleDateString()
                  : "NA"}
              </div>
            </List.Item>
            <Divider hidden />
            <List.Item>
              <h5 style={floatRight}>People</h5>
            </List.Item>
            <List.Item>
              <div style={floatRight}>Assignee</div>
            </List.Item>
            <List.Item>
              <div style={floatRight}>
                {task.assignedUser ? task.assignedUser : "Not Assigned"}
              </div>
            </List.Item>
            <List.Item>
              <div style={floatRight}>
                {task.assignedUser ? (
                  <></>
                ) : (
                  <Button
                    size="mini"
                    primary
                    basic
                    style={floatRight}
                    onClick={assignTaskToMeModal}
                  >
                    Assign to me
                  </Button>
                )}
              </div>
            </List.Item>

            <List.Item>
              <div style={floatRight}>
                {task.assignedUser ? (
                  ""
                ) : (
                  <>
                    <Form size="mini" style={floatRight}>
                      <Form.Dropdown
                        label="Assign teammate"
                        placeholder="Select teammate"
                        selection
                        clearable
                        value={assignedUser}
                        options={getAllTeamMember()}
                        onChange={(e, { value }) => {
                          setAssignedUser(value);
                        }}
                      />
                      <Form.Button
                        primary
                        size="mini"
                        style={floatRight}
                        onClick={assignTaskToUserModal}
                      >
                        Assign
                      </Form.Button>
                    </Form>
                  </>
                )}
              </div>
            </List.Item>

            {
              //If user is assigned, then only show who assigned the user
              task.assignedBy ? (
                <>
                  <List.Item>
                    <div style={floatRight}>Assigned By</div>
                  </List.Item>
                  <List.Item>
                    <div style={floatRight}>{task.assignedBy}</div>
                  </List.Item>
                </>
              ) : (
                //Show nothing is user in not assinged
                ""
              )
            }
          </List>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default DetailedTaskComponent;
