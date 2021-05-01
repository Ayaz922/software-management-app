import axiosInstance from "./axios";
import { getCurrentUser } from "../user/user-profile";
const url = "/task";

const addTask = (taskModel, callback) => {
  axiosInstance.post(url, taskModel).then(
    (response) => {
      if (response.status === 200) {
        console.log(response.data);
        callback(true, "Data saved successfully", response.data);
      } else {
        console.log(response.data);
        callback(false, "Failed to save data", response.data);
      }
    },
    (error) => {
      callback(false, error, null);
      console.log(error);
    }
  );
};

const editTask = (taskModel, callback) => {
  const taskId = taskModel._id;
  delete taskModel['_id']
  axiosInstance.put(url+"/update/"+taskId, taskModel).then(
    (response) => {
      if (response.status === 200) {
        console.log(response.data);
        callback(true, "Data saved successfully", response.data);
      } else {
        console.log(response.data);
        callback(false, "Failed to save data", response.data);
      }
    },
    (error) => {
      callback(false, error, null);
      console.log(error);
    }
  );
};


const getAllTask = (callback) => {
  axiosInstance.get(url).then(
    (response) => {
      if (response.status === 200) {
        console.log(response.data);
        callback(true, "Data fetched successfully", response.data);
      } else {
        console.log(response.data);
        callback(false, "Failed to fetch data", response.data);
      }
    },
    (error) => {
      callback(false, error, null);
      console.log(error);
    }
  );
};

const getTask = (taskId, callback) => {
  axiosInstance.get(url + "/" + taskId).then(
    (response) => {
      callback(true, response.data);
    },
    (error) => {
      callback(false, error);
    }
  );
};

const assignTaskToMe = (taskModel, callback) => {
  const userId = getCurrentUser();
  const body = {
    assignedUser: userId,
  };
  const putURL = url + "/assign/" + taskModel._id;
  axiosInstance.put(putURL, body).then(
    (response) => {
      if (response.status === 200) {
        console.log(response.data);
        callback(true, "Data saved successfully", response.data);
      } else {
        console.log(response.data);
        callback(false, "Failed to save data", response.data);
      }
    },
    (error) => {
      callback(false, error, null);
      console.log(error);
    }
  );
};

const assignTaskToUser = (taskModel, userId, callback) => {
  const body = {
    assignedUser: userId,
  };
  const putURL = url + "/assign/" + taskModel._id;
  axiosInstance.put(putURL, body).then(
    (response) => {
      if (response.status === 200) {
        console.log(response.data);
        callback(true, "Data saved successfully", response.data);
      } else {
        console.log(response.data);
        callback(false, "Failed to save data", response.data);
      }
    },
    (error) => {
      callback(false, error, null);
      console.log(error);
    }
  );
};

const addCommentToTask = (taskId, commentModel, callback) => {
  const body = {
    comments: commentModel,
  };
  const putURL = url + "/addComment/" + taskId;
  axiosInstance.put(putURL, body).then(
    (response) => {
      if (response.status === 200) {
        callback(true, "Comment saved successfully");
      } else {
        console.log(response.data);
        callback(false, "Failed to save data");
      }
    },
    (error) => {
      callback(false, error);
      console.log(error);
    }
  );
};

const changeStatus = (taskId, status, callback) => {
  const body = {
    status,
  };
  axiosInstance
    .put(url + "/" + taskId, body)
    .then(response=> {
      console.log(response);
    })
    .catch(err => {
      sendError(err,callback)
    });
};

const changeDueDate = (taskId, dueDate, callback) => {
  const body = {
    dueDate,
  };
  axiosInstance
    .put(url + "/update/" + taskId, body)
    .then(response=> {
      console.log(response);
    })
    .catch(err => {
      sendError(err,callback)
    });
};


const sendError = (err, callback) => {
  if (err.response.status === 400)
    callback(false, "Invalid request, Please check status id & status");
  else if (err.response.status === 401)
    callback(false, "You are not authorized to perform the operation");
  else if (err.response.status === 403)
    callback(false, "You don't have permission to perform the operation");
  else callback(false, "Internal Error");
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
  changeDueDate
};
