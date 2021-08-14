import Navbar from "../navbar/navbar";
import TaskList from "../task-list/list/task-list";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddTaskComponent from "../add-task/add-task";
import LandingScreen from "../landing-screen/landing-screen";
import LoginForm from "../login/login";
import { useEffect, useState } from 'react'
import ProjectComponent from "../projects/projects";
import EditTaskComponent from "../edit-task/edit-task";
import DetailedTaskComponent from "../detailed-task/detailed-task";
import useLocalStorage, { LOGGED_IN } from "../../utils/localstorage/localStorage";
import AddTaskModal from "../task/add-task/AddTaskModal";
import { Modal } from "semantic-ui-react";
import { setProjectId } from "../../redux/actions/project/project-actions";
import {useDispatch} from 'react-redux'

function Home() {
  const [loggedIn, setLoggin] = useLocalStorage(LOGGED_IN, false);
  const [reload, setReload] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(setProjectId("60a893ca6694da3ec86f6429"));
  }, [loggedIn, reload])



  const openNewTaskModal = () => {
    setShowTaskModal(!showTaskModal);
  }
  console.log('Rendering home')



  return (
    <div className="componentContainer">
      <Router>
        <AddTaskModal
          open={showTaskModal}
          onClose={() => { setShowTaskModal(!showTaskModal) }}
        />
        <Modal
          open={showLogoutModal}
          header="Are you sure?"
          content="Are you sure you want to logout."
          size='small'
          actions={[
            { key: "logout", content: "Logout" },
            { key: "done", content: "Close", positive: true },
          ]}
          onActionClick={(e: any) => {
            if (e.target.innerHTML === "Logout"){
                  setLoggin(false);
            }
            setShowLogoutModal(false);
          }}
        />
        <div className="wrapper">
          
          <Navbar
            //@ts-ignore
            className="navbar"
            logoutCallback={() => { setLoggin(false) }}
            reload={() => {
              //setReload(!reload)
            }}
            createTask={openNewTaskModal}
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
              <>
                <LoginForm logginCallback={(value) => {
                  setLoggin(value)
                }} />
              </>
            )}
          </div>
        </div>
      </Router>

    </div>
  );
}

export default Home;
