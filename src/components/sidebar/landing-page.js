import React from "react";
import { Grid, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import AddTaskComponent from "../add-task/add-task";

const SideBar = () => {
  const [visible, setVisible] = React.useState(true);

  return (
    <Grid columns={1}>
      <Grid.Column>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="push"
            direction="left"
            icon="labeled"
            inverted
            onHide={() => setVisible(false)}
            vertical
            visible={true}
            width="thin"
          >
            <Menu.Item as="a">
              <Icon name="home" />
              Home
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="clipboard list" />
              Board
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="tasks" />
              My Task
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="flipboard" />
              My Projects
            </Menu.Item>
          </Sidebar>
        </Sidebar.Pushable>
      </Grid.Column>
    </Grid>
  );
};

export default SideBar;
