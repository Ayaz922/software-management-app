import moment from "moment";
import { useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import './detailed-task.css'
import { Link } from 'react-router-dom'

import {
  Divider,
  Grid,
  Icon,
  Label,
  List,
  Button,
  Modal,
  Form,
  Dropdown,
} from "semantic-ui-react";
import {
  assignTaskToMe,
  assignTaskToUser,
  changeStatus,
  getTask,
  changeDueDate,
} from "../../api/task-api";
import { getAllTeamMember } from "../../user/user-profile";
import {
  getTextForTaskTypeId,
  taskStatusOptions,
} from "../../utils/general_data";
import {
  getColorForPriority,
  getTaskTypeText,
  getRandomColor,
} from "../../utils/utils-functions";
import CommentComponent from "../comments/comments";
import TaskModel, { taskModel } from "../../models/task-model";
import { TaskType } from "../../models/task-type";
import { TaskStatus } from "../../models/tast-status";

const DetailedTaskComponent = () => {
  const id = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );

  const [task, setTask] = useState<TaskModel>(taskModel);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<any>({});
  const [reloadPage, setReloadPage] = useState(false);
  const [assignedUser, setAssignedUser] = useState<any>();
  const [status, setStatus] = useState(TaskStatus.BACKLOG);
  const [dueDate, setDueDate] = useState<Date | undefined>();

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
        assignTaskToMe(task, (success, data, message) => {
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

  const generateModal = (header: string, content: string, action: () => any) => {
    let modal: any ={}
    modal.header = header;
    modal.content = content;
    modal.action = action;
    setModalContent(modal);
  };

  const callback = (success: boolean, response: any) => {
    console.log(response);
    if (success) {
      setTask(response);
      setStatus(response.status);
      response.dueDate
        ? setDueDate(moment(response.dueDate).toDate())
        : setDueDate(undefined);
    } else alert(response);
  };

  //@ts-ignore
  const handleStatusChange = (e: any, { value }) => {
    if (status != value) setStatus(value);
    generateModal("Alert!", "Are you sure you want to change status?", () => {
      if (task._id)
        changeStatus(task._id, value, (success, message) => {
          if (success) setReloadPage(true);
          else {
            setStatus(task.status);
            alert(message);
          }
        });
    });
    setShowModal(true);
  };

  const onDueDateChanged = (newDueDate: Date | undefined) => {
    console.log(moment(newDueDate).toDate());
    generateModal(
      "Change due date?",
      "Are you sure you want to change due date for this task?",
      () => {
        setDueDate(moment(newDueDate).toDate());
        if (task._id && newDueDate)
          changeDueDate(task._id, newDueDate, (success, message) => {
            if (success) setReloadPage(true);
            else {
              if (task.dueDate)
                setDueDate(task.dueDate);
              alert(message);
            }
          });
      }
    );
    setShowModal(true);
  };

  let lables = [];
  if (task.lables && task.lables.length > 0)
    task.lables.forEach((lable) => {
      lables.push(
        <Label
          size="tiny"
          key={lable}
          content={lable}
          //@ts-ignore
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
        onActionClick={(e: any, data) => {

          if (e.target.innerHTML === "Yes") modalContent.action();
          setShowModal(false);
        }}
      />
      <Grid style={{ padding: "10px 10px 0px 10px" }}>
        {/* Left Section */}
        <Grid.Column width={12}>
          <span>ID: #{id.substring(20, 24)}</span>
          <Link to={'/task/edit/' + task._id}>&nbsp;  <i className="edit outline icon"></i>Edit Task</Link>
          <h3>{task.title}</h3>
          <span>Description: {task.description}</span>
          <h5>Lables</h5>
          {lables}
          <Divider hidden />
          <CommentComponent
            comments={task.comments}
            taskId={task._id ? task._id : ''}
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
              <Button.Group color="purple" style={floatRight} size="tiny">
                <Button clickable="false">
                  {getTextForTaskTypeId(status)}
                </Button>
                <Dropdown
                  className="button icon"
                  floating
                  value={status}
                  options={taskStatusOptions}
                  //@ts-ignore
                  onChange={handleStatusChange}
                  trigger={<></>}
                />
              </Button.Group>
            </List.Item>
            <Divider hidden />

            <Divider hidden />
            <List.Item>

              <div
                //@ts-ignore
                style={floatRight}>
                Due date &nbsp;
                <DatePicker
                  style={floatRight}
                  //@ts-ignore
                  clearIcon
                  value={dueDate}
                  minDate={new Date()}
                  //@ts-ignore
                  onChange={onDueDateChanged}
                />
              </div>
            </List.Item>
            <List.Item>
              <div
                //@ts-ignore
                style={floatRight}>
                Created At &nbsp;
                <Icon name="calendar alternate outline" />
                {task.createdAt
                  ? new Date(task.createdAt).toLocaleDateString()
                  : "NA"}
              </div>
            </List.Item>
            <Divider hidden />
            <List.Item>

              <h5
                //@ts-ignore
                style={floatRight}
              >People</h5>
            </List.Item>
            <List.Item>
              <div
                //@ts-ignore
                style={floatRight}>Assignee</div>
            </List.Item>
            <List.Item>
              <div
                //@ts-ignore
                style={floatRight}>
                {task.assignedUser ? task.assignedUser : "Not Assigned"}
              </div>
            </List.Item>
            <List.Item>
              <div className='fillParent'>
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
              <div
                //@ts-ignore
                style={floatRight}>
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
                    <div
                      //@ts-ignore
                      style={floatRight}>Assigned By</div>
                  </List.Item>
                  <List.Item>
                    <div
                      //@ts-ignore
                      style={floatRight}>{task.assignedBy}</div>
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
