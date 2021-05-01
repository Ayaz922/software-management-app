import axios from "axios";
import { apiCallback } from "../models/api-callback-function";
import { UserDetail } from '../models/userDetailsLogin'


const url = "http://localhost:8001";
const login = (userDetail:UserDetail, callback:apiCallback)=>{
  
    axios.post(url+"/login", userDetail).then(
        (response) => {
          console.log(response)
          callback(true,response.data,"Logged in")
        },
        (error) => {
          callback(false,error,"Loggin Error ")
        }
      );
}

export {
    login
}