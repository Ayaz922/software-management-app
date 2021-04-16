import axios from "axios";
import { getCurrentUser } from "../user/user-profile";
const url = "http://3.15.46.120:3000/task";

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

const assignTaskToUser = ()=>{

}

const assignTaskToMe = (taskModel, callback)=> {
  console.log("Assigning task to you, taskID: "+taskModel._id )
  const userId = getCurrentUser()
  const body ={
    assignedUser:userId
  }
  const putURL = url+"/"+taskModel._id
  console.log('Put URL: '+putURL)
  axios.put(putURL,body).then(
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
  
}



export { addTask, getAllTask, assignTaskToMe, assignTaskToUser};
