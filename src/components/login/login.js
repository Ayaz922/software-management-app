import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Progress,
  Segment,
} from "semantic-ui-react";
import { login } from "../../api/login";
import {setLoggedIn, storeToken} from "../../services/authservice"

const LoginForm = (props) => {
  console.log(props)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const startLogin = ()=> {
    if(!username || !password || username === "" || password ===""){
      alert('Please enter valid username and password')
      return 
    } 
    setLoading(true)
    login({username,password},(success,message,data)=>{
      if(success){
      if(data.loggedIn){
        setLoggedIn(true)
        storeToken(data.accessToken)
        props.logginCallback(true)
      }else{
        alert("Couldn't log in")
      }
    }else{
      console.log(message+" : "+data)
    }
    });
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
         Log-in to your account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              value={username}
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              onChange={(event)=>{
                setUsername(event.target.value)
              }}
            />
            <Form.Input
              fluid
              value={password}
              onChange={(event)=>{
                setPassword(event.target.value)
              }}
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />

            <Button color="teal" fluid size="large" onClick={startLogin}>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <span>Sign Up</span>
        </Message>
        <Progress loading={loading} ></Progress>
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;
