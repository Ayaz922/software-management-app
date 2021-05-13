import React, { useState } from "react";
import {
  Button,
  Divider,
  Form,
  Grid,
  Header,
  Segment,
} from "semantic-ui-react";
import { login } from "../../api/login";

import useLocalStorage, { CURRENT_USER, LOGGED_IN, TOKEN } from "../../utils/localstorage/localStorage";
interface PropType {
  logginCallback: (loggedin: boolean) => void
}
const LoginForm: React.FC<PropType> = (props) => {
  const [token,setToken] = useLocalStorage(TOKEN)
  const [loggedIn,setLoggin] = useLocalStorage(LOGGED_IN,false);
  const [user,setUser] = useLocalStorage(CURRENT_USER);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const startLogin = () => {
    if (!username || !password || username === "" || password === "") {
      alert('Please enter valid username and password')
      return
    }
    login({ username, password }, (success, data: any, message) => {
      if (success) {
        if (data.loggedIn) {
          setLoggin(true)
          setToken(data.accessToken)
          setUser(data.user)
          props.logginCallback(true)
          console.log('Logged In ',token)
        } else {
          alert("Couldn't log in")
        }
      } else {
        console.log(message + " : " + data)
      }
    });
  }

  return (
    <div style={{ background: '#e2e1e0' }}>
      <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>

          <Form size="large">
            <Segment stacked>
              <Header as="h2" color='grey' textAlign="center">
                Log-in to your account
        </Header>
              <Form.Input
                fluid
                value={username}
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                onChange={(event) => {
                  setUsername(event.target.value)
                }}
              />
              <Form.Input
                fluid
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                }}
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
              />

              <Button primary fluid size="large" onClick={startLogin}>
                Login
            </Button>
              <Divider hidden />
              <Form.Field>

                New to us? Sign Up
            </Form.Field>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default LoginForm;
