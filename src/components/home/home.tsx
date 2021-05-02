import Navbar from "../navbar/navbar";
import TaskList from "../task-list/list/task-list";
import { createRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddTaskComponent from "../add-task/add-task";
import LandingScreen from "../landing-screen/landing-screen";
import LoginForm from "../login/login";
import {useState, useEffect} from 'react'
import ProjectComponent from "../projects/projects";
import EditTaskComponent from "../edit-task/edit-task";
import DetailedTaskComponent from "../detailed-task/detailed-task";

function Home() {

  const [isAutheticated,setIsAuthenticated] = useState(true)

  useEffect(()=>{
  },[isAutheticated])

  return (
    <>
      
        <Router>
          <div className="wrapper">
            {/* <Sticky context = {context} className="navbar"> */}
            <Navbar 
            //@ts-ignore
            className="navbar" 
            logoutCallback={()=>{setIsAuthenticated(false)}}/>
            {/* </Sticky> */}
            <div className="emptySpace"></div>
            <div className="content">
            {isAutheticated ? (
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
                  setIsAuthenticated(value)
                }}/>
              )}
            </div>
          </div>
        </Router>
     
    </>
  );
}

export default Home;
