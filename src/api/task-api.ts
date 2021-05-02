import axiosInstance from "./axios";
import { getCurrentUser } from "../user/user-profile";
import TaskModel from "../models/task-model";
import { apiCallback } from "../models/api-callback-function";
import CommentModel from "../models/comment-model";
import { TaskStatus } from "../models/tast-status";
const url = "/task";

const addTask = (taskModel: TaskModel, callback: apiCallback) => {
  axiosInstance.post(url, taskModel).then(
    (response) => {
      if (response.status === 200) {
        console.log(response.data);
        callback(true, response.data, "Data saved successfully");
      } else {
        console.log(response.data);
        callback(false, response.data, "Failed to save data");
      }
    },
    (error) => {
      callback(false, error);
      console.log(error);
    }
  );
};

const editTask = (taskModel: TaskModel, callback: apiCallback) => {
  const taskId = taskModel._id;
  delete taskModel["_id"];
  axiosInstance.put(url + "/update/" + taskId, taskModel).then(
    (response) => {
      if (response.status === 200) {
        console.log(response.data);
        callback(true, response.data, "Data saved successfully");
      } else {
        console.log(response.data);
        callback(false, response.data, "Failed to save data");
      }
    },
    (error) => {
      callback(false, error);
      console.log(error);
    }
  );
};

const getAllTask = (callback: apiCallback) => {
  axiosInstance.get(url).then(
    (response) => {
      if (response.status === 200) {
        console.log(response.data);
        callback(true, response.data);
      } else {
        console.log(response.data);
        callback(false, response.data);
      }
    },
    (error) => {
      callback(false, null, error);
      console.log(error);
    }
  );
};

const getTask = (taskId: string, callback: apiCallback) => {
  axiosInstance.get(url + "/" + taskId).then(
    (response) => {
      callback(true, response.data);
    },
    (error) => {
      callback(false, error);
    }
  );
};

const assignTaskToMe = (taskModel: TaskModel, callback: apiCallback) => {
  const userId = getCurrentUser();
  const body = {
    assignedUser: userId,
  };
  const putURL = url + "/assign/" + taskModel._id;
  axiosInstance.put(putURL, body).then(
    (response) => {
      if (response.status === 200) {
        console.log(response.data);
        callback(true, response.data, "Data saved successfully");
      } else {
        console.log(response.data);
        callback(false, response.data, "Failed to save data");
      }
    },
    (error) => {
      callback(false, error);
      console.log(error);
    }
  );
};

const assignTaskToUser = (
  taskModel: TaskModel,
  userId: string,
  callback: apiCallback
) => {
  const body = {
    assignedUser: userId,
  };
  const putURL = url + "/assign/" + taskModel._id;
  axiosInstance.put(putURL, body).then(
    (response) => {
      if (response.status === 200) {
        console.log(response.data);
        callback(true, response.data, "Data saved successfully");
      } else {
        console.log(response.data);
        callback(false, response.data, "Failed to save data");
      }
    },
    (error) => {
      callback(false, error);
      console.log(error);
    }
  );
};

const addCommentToTask = (taskId: string, commentModel: CommentModel[], callback: apiCallback) => {
  const body = {
    comments: commentModel,
  };
  const putURL = url + "/addComment/" + taskId;
  axiosInstance.put(putURL, body).then(
    (response) => {
      if (response.status === 200) {
        callback(true, null, "Comment saved successfully");
      } else {
        console.log(response.data);
        callback(false, null, "Failed to save data");
      }
    },
    (error) => {
      callback(false, error);
      console.log(error);
    }
  );
};

const changeStatus = (
  taskId: string,
  status: TaskStatus,
  callback: apiCallback
) => {
  const body = {
    status,
  };
  axiosInstance
    .put(url + "/" + taskId, body)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      sendError(err, callback);
    });
};

const changeDueDate = (
  taskId: string,
  dueDate: Date,
  callback: apiCallback
) => {
  const body = {
    dueDate,
  };
  axiosInstance
    .put(url + "/update/" + taskId, body)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      sendError(err, callback);
    });
};

const sendError = (err: any, callback: apiCallback) => {
  if (err.response.status === 400)
    callback(false, null, "Invalid request, Please check status id & status");
  else if (err.response.status === 401)
    callback(false, null, "You are not authorized to perform the operation");
  else if (err.response.status === 403)
    callback(false, null, "You don't have permission to perform the operation");
  else callback(false, null, "Internal Error");
};

export {
  addTask,
  editTask,
  getAllTask,
  assignTaskToMe,
  assignTaskToUser,
  getTask,
  addCommentToTask,
  changeStatus,
  changeDueDate,
};
