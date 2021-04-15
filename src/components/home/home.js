import Navbar from '../navbar/navbar'
import TaskList from '../task-list/list/task-list';
import {createRef} from 'react'
import {Sticky } from 'semantic-ui-react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import AddTaskComponent from '../add-task/add-task';
import LandingScreen from '../landing-screen/landing-screen';

function Home(){

  const context = createRef()
    return(
      <Router>
        <div className="wrapper" ref ={context}>
          <Sticky context = {context}>
           <Navbar/>
           </Sticky>
           <div className="emptySpace"></div>
           <Switch>
          <Route path="/add-task" component={AddTaskComponent}/>
          <Route path="/tasks" component={TaskList}/> 
          <Route path="/" exact component={LandingScreen}/>
          </Switch>
        </div>
        </Router>
    );
}

export default Home;