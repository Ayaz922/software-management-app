import React, { useState, useEffect } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { setLoggedIn, storeToken } from "../../services/authservice";

function Navbar(props) {
  const [activeItem, setActiveItem] = useState('');

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  useEffect(() => {
    const currentURL = window.location.href;
    console.log(currentURL);
    if (currentURL.includes("tasks")) setActiveItem("Tasks");
    else if (currentURL.includes("add-task")) setActiveItem("Add Task");
    else if (currentURL.includes("project")) setActiveItem("Projects");
    else setActiveItem("home");
    console.log('Active item '+activeItem)
  }, [activeItem]);

  return (
    <div style={{ position: "absolute" }}>
      <Menu style={{ background: "white" }} pointing secondary fixed="top">
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
          <Menu.Item
          onClick ={
            ()=>{
              console.log('Logged out')
              setLoggedIn(false)
              storeToken('')
              props.logoutCallback()
            }
          }
          >Logout</Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
}

export default Navbar;
