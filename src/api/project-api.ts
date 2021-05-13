import getAxiosInstance from "./axios";
import { apiCallback } from "../models/api-callback-function";
import ProjectModel from "../models/project-model";
const url = "/project";

const axiosInstance = getAxiosInstance()

const addProjectToDatabase = (projectModel: ProjectModel, callback: apiCallback) => {
  axiosInstance.post(url, projectModel).then(
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

const getAllProjectFromDatabase = (callback: apiCallback) => {
    
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
  
  const getProjectFromDatabase = (projectId: string, callback: apiCallback) => {
    axiosInstance.get(url + "/" + projectId).then(
      (response) => {
        callback(true, response.data);
      },
      (error) => {
        callback(false, error);
      }
    );
  };

  const updateProjectToDatabase = (projectModel:ProjectModel, callback: apiCallback) => {
    axiosInstance.put(url + "/" + projectModel._id,projectModel).then(
      (response) => {
        callback(true, response.data);
      },
      (error) => {
        callback(false, error);
      }
    );
  };

  export {
      addProjectToDatabase,
      getAllProjectFromDatabase,
      getProjectFromDatabase,
      updateProjectToDatabase
  }
