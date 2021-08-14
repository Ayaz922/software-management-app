import React, { useState, useEffect } from "react";
import { Button, Dropdown, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { apiCallback } from "../../models/api-callback-function";
import { getMyProjects } from "../../api/user-api";
import useLocalStorage, { CURRENT_PROJECT, LOGGED_IN } from "../../utils/localstorage/localStorage";
import ProjectModel from "../../models/project-model";
import {useDispatch, connect} from 'react-redux'
import { setProjectId } from "../../redux/actions/project/project-actions";

type PropType = {
  logoutCallback: () => void,
  reload: () => void,
  createTask: ()=>void,
  projectState:any
}

function Navbar({projectState,logoutCallback,reload,createTask}:PropType) {

  const [activeItem, setActiveItem] = useState('');
  const [isLoggedIn] = useLocalStorage(LOGGED_IN)
  const [lastProject, setLastProject] = useLocalStorage(CURRENT_PROJECT);
  const dispacth = useDispatch();
  const projectOptions: any = []

  const handleItemClick = (e: any, { name }: any) => {
    setActiveItem(name);
  };
  const callback: apiCallback = (sucess, data) => {
    if (sucess) {
      data.forEach((project: ProjectModel) => {
        projectOptions.push({
          key: project._id,
          text: project.projectName,
          value: project._id,
        })
      })
    } else {
      alert("Fuck: "+data)
    }
  }

  useEffect(() => {
    //dispacth(setProjectId("60a893ca6694da3ec86f6429"))
    // const currentURL = window.location.href;
    // if (currentURL.includes("tasks")) setActiveItem("Tasks");
    // else if (currentURL.includes("add-task")) setActiveItem("Add Task");
    // else if (currentURL.includes("project")) setActiveItem("Projects");
    // else setActiveItem("home");
    // // //Load project options of the projects
    // // if (isLoggedIn && projectOptions.length == 0){
    // //   getMyProjects(callback);
    // //   dispacth(setProjectId(lastProject))
    // // }
  }, [activeItem, projectOptions, ]);

  return (
    <div style={{ position: "absolute" }}>
      <Menu size='mini' style={{ background: "white" }} pointing secondary fixed="top">
        <Menu.Item
          as={Link}
          to="/"
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
        />

        <Menu.Item
          as={Link}
          to="/tasks"
          name="Tasks"
          active={activeItem === "Tasks"}
          onClick={handleItemClick}
        />

        <Menu.Item
          as={Link}
          to="/project"
          name="Projects"
          active={activeItem === "Projects"}
          onClick={handleItemClick}
        />

        <Menu.Menu position="right">
          <Menu.Item as={Button} size="tiny">
            <Dropdown
              style={{ margin: '-4px 0px -6px 0px', maxHeight: '10px' }}
              options={projectOptions}
              selectOnBlur
              selection
              placeholder="Select Projects"
              value={projectState.projectId}
              onChange={(e, { value }:any) => {
                dispacth(setProjectId(value))
                setLastProject(value);
              }}
            />
          </Menu.Item>
          <Menu.Item as={Button} size="tiny">
            <Button
              size='tiny'
              primary
              basic
              icon='add'
              content='Create'
              onClick={() => { createTask()}}
            />
          </Menu.Item>
          <Menu.Item as={Button} size="tiny">
            <Button
              size='tiny'
              basic
              icon='power'
              content='Logout'
              color='black'
              onClick={() => {
                logoutCallback()
              }}
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
}
const mapStateToProps = (state:any) =>{
  return {projectState:state.projectReducer}
}

export default connect(mapStateToProps)(Navbar);
