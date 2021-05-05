import React, { useState, useEffect } from "react";
import { Button, Icon, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { setLoggedIn, storeToken } from "../../services/authservice";

type PropType = {
  logoutCallback: () => void
}

function Navbar({ logoutCallback }: PropType) {
  const [activeItem, setActiveItem] = useState('');

  const handleItemClick = (e: any, { name }: any) => {
    setActiveItem(name);
  };

  useEffect(() => {
    const currentURL = window.location.href;
    console.log(currentURL);
    if (currentURL.includes("tasks")) setActiveItem("Tasks");
    else if (currentURL.includes("add-task")) setActiveItem("Add Task");
    else if (currentURL.includes("project")) setActiveItem("Projects");
    else setActiveItem("home");
    console.log('Active item ' + activeItem)
  }, [activeItem]);

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
            <Button
              size='tiny'
              primary
              basic
              icon='add'
              content='Create'
              onClick={()=>{alert('Not implemented yet')}}
            />
          </Menu.Item>
          <Menu.Item as={Button} size="tiny">
            <Button
              size='tiny'
              basic
              icon='ellipsis vertical'
              color='black'
              onClick={()=>{alert('Not implemented yet')}}
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
}

export default Navbar;
