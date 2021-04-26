import axios from "axios";
const url = "http://localhost:8001";

const login = (userDetail, callback)=>{
  
    axios.post(url+"/login", userDetail).then(
        (response) => {
          console.log(response)
          callback(true,"Logged in",response.data)
        },
        (error) => {
          callback(false,"Loggin Error ",error)
        }
      );
}

export {
    login
}