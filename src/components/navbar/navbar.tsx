import React, { useState, useEffect } from "react";
import { Button, Dropdown, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { apiCallback } from "../../models/api-callback-function";
import { getMyProjects } from "../../api/user-api";
import useLocalStorage, { CURRENT_PROJECT, LOGGED_IN } from "../../utils/localstorage/localStorage";
import ProjectModel from "../../models/project-model";
import {useStore, useDispatch, connect, useSelector} from 'react-redux'
import { setProjectId } from "../../redux/actions/project/project-actions";

type PropType = {
  logoutCallback: () => void,
  reload: () => void
}

function Navbar({projectState}:any) {
  const [activeItem, setActiveItem] = useState('');
  const [isLoggedIn] = useLocalStorage(LOGGED_IN)
  const dispacth = useDispatch();
  const projectOptions: any = []
  console.log('Project State',projectState)

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
        if (projectOptions.length > 0) {
          //dispacth(setProjectId(projectOptions[0].key))
        }
      })
    } else {
      alert(data)
    }
  }

  useEffect(() => {
    const currentURL = window.location.href;
    if (currentURL.includes("tasks")) setActiveItem("Tasks");
    else if (currentURL.includes("add-task")) setActiveItem("Add Task");
    else if (currentURL.includes("project")) setActiveItem("Projects");
    else setActiveItem("home");
    //Load project options of the projects
    if (isLoggedIn && projectOptions.length == 0)
      getMyProjects(callback);
    
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
          to="/add-task"
          name="Add Task"
          active={activeItem === "Add Task"}
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
                //setCurrentProject(value);
                //setCurrentProjectId(value);
                //reload();
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
              onClick={() => { alert('Not implemented yet') }}
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
                //logoutCallback()
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
