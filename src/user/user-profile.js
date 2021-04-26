const devs = [
    { key: 1, text: "Jon Doe(Admin)", value: "ayaz@airbus.com" },
    { key: 2, text: "Jon Doe(PM)", value: "pm@airbus.com" },
    { key: 3, text: "Jon Doe(Dev)", value: "dev@airbus.com" },
    { key: 4, text: "Jon Doe(TesT)", value: "tester@airbus.com" }
    ]


const getCurrentUser = () => {
    return  "dev@airbus.com"
}

const getDeveloperList = ()=>{
    return [
        {name:"Ayaz Alam",email:"ayazalam@email.com"},
        {name:"Jon Doe",email:"jondoe@email.com"},
        {name:"Kanika Ranka",email:"kanikaranka@email.com"},
        {name:"John",email:"John@email.com"},
        {name:"Sesame",email:"sesame@email.com"},
        {name:"Marry",email:"marry@email.com"},
        {name:"Penny",email:"penny@email.com"},
        {name:"George",email:"george@email.com"},
    ]
}

const getAllTeamMember = ()=>{
  
    return devs
}

const getUserNameFromUsername = (username)=>{
    //pseudocode for the work, need to complete this tooo
    let name = 'NA'
    devs.forEach(user=>{
        if(user.value === username)
         name =  user.text
    })
    return name;
}

export {getCurrentUser, getDeveloperList, getAllTeamMember, getUserNameFromUsername}