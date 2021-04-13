import axios from "axios";
const url = "http://localhost:3000/task";

const addTask = (taskModel, callback) => {
  axios.post(url, taskModel).then(
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
  axios.get(url).then(
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

export { addTask, getAllTask };
