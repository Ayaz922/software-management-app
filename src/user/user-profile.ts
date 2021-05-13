import { getAllTeam, getTeamMemberByType } from "../api/user-api";
import { apiCallback } from "../models/api-callback-function";
import UserType from "../models/user-type";
import { CURRENT_USER } from "../utils/localstorage/localStorage"
import { getCurrentProject } from "../utils/projectHelper";

const devs = [
    { key: 1, text: "Jon Doe(Admin)", value: "ayaz@airbus.com" },
    { key: 2, text: "Jon Doe(PM)", value: "pm@airbus.com" },
    { key: 3, text: "Jon Doe(Dev)", value: "dev@airbus.com" },
    { key: 4, text: "Jon Doe(TesT)", value: "tester@airbus.com" }
    ]


const getCurrentUser = () => {
    let currentUser = localStorage.getItem(CURRENT_USER)
    currentUser = currentUser?currentUser:"";
    return  JSON.parse(currentUser);
}

const getDeveloperList = (callback:apiCallback)=>{
    getTeamMemberByType(getCurrentProject(),UserType.DEVELOPER,callback)
}

const getAllTeamMember = ()=>{
    return devs;
}

const getUserNameFromUsername = (username:string)=>{
    //pseudocode for the work, need to complete this tooo
    let name = 'NA'
    devs.forEach(user=>{
        if(user.value === username)
         name =  user.text
    })
    return name;
}

const getAllProjectManagers = ()=>{
    const pms=[
        {key:'pm1',text:'Jon Doe',value:'pm@airbus.com'},
        {key:'pm2',text:'Davis',value:'pm1@airbus.com'}
    ]
    return pms;
}

export {getCurrentUser, getDeveloperList, getAllTeamMember, getUserNameFromUsername, getAllProjectManagers}