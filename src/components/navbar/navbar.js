import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
function Navbar() {
  const [activeItem, setActiveItem] = useState("home");

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };
  return (
    <div style={{ position: "absolute" }}>
      <Menu style={{ background: "white" }} pointing secondary fixed="top">
        <Menu.Item
          to="/"
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
        />

        <Menu.Item
          to="/tasks"
          name="Tasks"
          active={activeItem === "Tasks"}
          onClick={handleItemClick}
        />

        <Menu.Item
          to="/add-task"
          name="Add Task"
          active={activeItem === "Add Task"}
          onClick={handleItemClick}
        />

        <Menu.Item
          to="/project"
          name="Projects"
          active={activeItem === "Projects"}
          onClick={handleItemClick}
        />

        <Menu.Menu position="right">
          <Menu.Item>Logout</Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
}

export default Navbar;
