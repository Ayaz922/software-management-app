import { apiCallback } from "../models/api-callback-function";
import getAxiosInstance from "./axios";

const url = "/user";

const axiosInstance = getAxiosInstance()

const getAllTeam = (projectId: string, callback: apiCallback) => {
  axiosInstance.get(url+'/?projectId='+projectId).then(
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
      callback(false, error);
      console.log(error);
    }
  );
};

const getTeamMemberByType = (
  projectId: string,
  userType: string,
  callback: apiCallback
) => {
  axiosInstance.get(url+'/?projectId='+projectId+'&userType='+userType).then(
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
      callback(false, error);
      console.log(error);
    }
  );
};

const getUser = (userId: string, callback: apiCallback) => {
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
      callback(false, error);
      console.log(error);
    }
  );
};

const getMyProjects = (callback: apiCallback) => {

  axiosInstance.get('/project/myprojects').then(
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
      callback(false, error);
      console.log(error);
    }
  );
};

const addUserToProject=(userId:string,projectId:string,callback:apiCallback)=>{
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
          callback(false, error);
          console.log(error);
        }
      );
}

export {
    getAllTeam,
    getTeamMemberByType,
    getUser,
    addUserToProject,
    getMyProjects
}
