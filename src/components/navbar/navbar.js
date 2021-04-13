import React, { useState } from 'react'
import { Input, Menu, Segment } from 'semantic-ui-react'

function Navbar(){
  const [activeItem,setActiveItem] = useState('home');

  const handleItemClick = (e,{name}) =>{
    setActiveItem(name);
  } 
    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='Tasks'
            active={activeItem === 'Tasks'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='Board'
            active={activeItem === 'Board'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='Projects'
            active={activeItem === 'Projects'}
            onClick={handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item>
              Logout
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
}

export default Navbar;