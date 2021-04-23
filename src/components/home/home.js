import Navbar from '../navbar/navbar'
import TaskList from '../task-list/list/task-list';
import {createRef} from 'react'
import {Sticky } from 'semantic-ui-react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import AddTaskComponent from '../add-task/add-task';
import LandingScreen from '../landing-screen/landing-screen';
import LoginForm from '../login/login';

function Home(){

  const context = createRef()
    return(
      <Router>
        <div className="wrapper" ref ={context}>
          {/* <Sticky context = {context} className="navbar"> */}
           <Navbar className="navbar"/>
           {/* </Sticky> */}
           <div className="emptySpace"></div>
           <div className="content">
           <Switch>
          <Route path="/add-task" component={AddTaskComponent}/>
          <Route path="/tasks" component={TaskList}/> 
          <Route path="/project" component={LoginForm}/>
          <Route path="/" exact component={LandingScreen}/>
          
          </Switch>
          </div>
        </div>
        </Router>
    );
}

export default Home;