import React, { Component, useEffect, useState } from "react";
import { Button, Menu } from "semantic-ui-react";
import ProjectModel from "../../../models/project-model";

type PropType = {
  projectList: Array<ProjectModel>
  onItemClick: (projectId: string) => void
  onNewProject: ()=>void
}

const ProjectSidebar = ({ projectList, onItemClick,onNewProject }: PropType) => {

  const [activeItem, setActiveItem] = useState('enterprise')
  const handleItemClick = (e: any, { id }: any) => {
    onItemClick(id)
    setActiveItem(id)
  }
  useEffect(() => {
    //Auto enable the first project if available
    if (projectList.length > 0)
      handleItemClick(null, { id: projectList[0]._id });
    
  }, [projectList])

  //Component Array to hold list of Menu.Item components containing infromation about the project
  const projectComponentArray: any = []
  //Mapping each project details to component & pushing in the array
  projectList.map(project => {
    projectComponentArray.push(
      <Menu.Item
        name={project.key}
        id={project._id}
        active={activeItem === project._id}
        onClick={handleItemClick}
      />
    )
  })

  return (
    <Menu vertical fluid>
      <Menu.Item>
        <Menu.Header>Projects</Menu.Header>

        <Menu.Menu>
          {projectComponentArray}
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item>
        <Menu.Header>Options</Menu.Header>

        <Menu.Menu>
          <Menu.Item
            name="Option 1"
            active={activeItem === "rails"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="Option 2"
            active={activeItem === "python"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name="Option 3"
            active={activeItem === "php"}
            onClick={handleItemClick}
          />
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item>
        <Button fluid size='small' icon="add" content="New Project" primary onClick={onNewProject} />
      </Menu.Item>
    </Menu>
  );
};

export default ProjectSidebar;