import Navbar from '../navbar/navbar'
import TaskList from '../task-list/list/task-list';

function Home(){
    return(
        <div className="wrapper">
           <Navbar/>
           <div className="emptySpace"></div>
           <TaskList/>
           {/* <LandingPage/> */}
        </div>
    );
}

export default Home;