import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

function Navbar() {
  const [activeItem, setActiveItem] = useState("home");

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };
  return (
    <div style={{ position: "absolute" }}>
      <Menu style={{ background: "white" }} pointing secondary fixed="top">
        <Link to="/">
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={handleItemClick}
          />
        </Link>
        <Link to="/tasks">
          <Menu.Item
            name="Tasks"
            active={activeItem === "Tasks"}
            onClick={handleItemClick}
          />
        </Link>
        <Link to="/add-task">
          <Menu.Item
            name="Add Task"
            active={activeItem === "Add Task"}
            onClick={handleItemClick}
          />
        </Link>
        <Link to="/project">
          <Menu.Item
            name="Projects"
            active={activeItem === "Projects"}
            onClick={handleItemClick}
          />
        </Link>
        <Menu.Menu position="right">
          <Menu.Item>Logout</Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
}

export default Navbar;
