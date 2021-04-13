import React, {useState, useEffect} from "react";
import { CardGroup } from "semantic-ui-react";
import { getAllTask } from "../../../api/task-api";
import TaskCard from "../task-card/task-card";

const TaskList = () => {

  const [taskList,setTaskList] = useState([]);
  let cards = [];
  
  const callback = (success, message, data)=>{
    if(success){
        setTaskList(data)
        console.log(cards)
    }else{
        console.log('ERROR WHILE FETCHING THE DATA: '+message)
    }
  };

  useEffect(() => {
    getAllTask(callback)
  }, []);


  
  for (const [index, value] of taskList.entries()) {
    cards.push(<TaskCard key={index} task={value} />);
  }

  return (
    <div>
      <CardGroup>{cards}</CardGroup>
    </div>
  );
};

export default TaskList;
