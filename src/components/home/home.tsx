import Navbar from "../navbar/navbar";
import TaskList from "../task-list/list/task-list";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddTaskComponent from "../add-task/add-task";
import LandingScreen from "../landing-screen/landing-screen";
import LoginForm from "../login/login";
import {useEffect, useState} from 'react'
import ProjectComponent from "../projects/projects";
import EditTaskComponent from "../edit-task/edit-task";
import DetailedTaskComponent from "../detailed-task/detailed-task";
import useLocalStorage, { LOGGED_IN } from "../../utils/localstorage/localStorage";

function Home() {
  const [loggedIn,setLoggin] = useLocalStorage(LOGGED_IN,false);
  const [reload,setReload] = useState(false);
  useEffect(()=>{

  },[loggedIn,reload])

  console.log('reloading...')
  return (
    <>
      
        <Router>
          <div className="wrapper">
            {/* <Sticky context = {context} className="navbar"> */}
            <Navbar 
            //@ts-ignore
            className="navbar" 
            logoutCallback={()=>{setLoggin(false)}}
            reload = {()=>{
              console.log('funtion called')
              setReload(!reload)
            
            }}
            />
            {/* </Sticky> */}
            <div className="emptySpace"></div>
            <div className="content">
            {loggedIn ? (
              <Switch>
                <Route path="/add-task" component={AddTaskComponent} />
                <Route path="/tasks" component={TaskList} />
                <Route path="/project" component={ProjectComponent} />
                <Route path="/task/:id" exact component={DetailedTaskComponent} />
                <Route path="/task/edit/:id" exact component={EditTaskComponent} />
                <Route path="/login" exact component={LoginForm} />
                <Route path="/" exact component={LandingScreen} />
              </Switch>
               ) : (
                <LoginForm logginCallback={(value)=>{
                  setLoggin(value)
                }}/>
              )}
            </div>
          </div>
        </Router>
     
    </>
  );
}

export default Home;
