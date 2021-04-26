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


const assignTaskToUser = (taskModel,userId, callback) => {
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

const addCommentToTask = (taskId,commentModel, callback) => {
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

export { addTask, getAllTask, assignTaskToMe, assignTaskToUser, getTask, addCommentToTask }
