import React, {Component} from 'react';
import '../App.css';

import ResponsiveDrawer from './sidenav/sidenav.js'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import dashboardComponent from './dashboard/dashboard'
import { Container } from 'reactstrap';
import Dash from './dashboard/dashboard.js'
// import Sub from './sidenav/SubMenu.js'
// import Addgroups from './groups/groupForm.js'
import Groups from './groups/groups.js'
// import AddTasks from './tasks/taskForm.js'
// import Tasks from './tasks/tasks.js'
import Tasks2 from './tasks/tasks-2.js'
import Meetings from './zoom/meetings.js'
import Chat from './chatting/WelcomeScreen.js'
import ChatS from './chatting/ChatScreen'




// import AddMeetings from './zoom/meetingForm.js'







class home extends Component {
    constructor(){
        super()
        this.state = {

        }
    }

    componentDidMount(){
        console.log(window.location.pathname);
    }

    render(){

        if (!localStorage.getItem("Login")){
            console.log('null')
            return <Redirect to="/adminlogin" />
        }

        return (
            <Switch>
            <Route exact path="/employees" component={Dash} />
            <Route exact path="/employees/meetings" component={Meetings} />
            <Route exact path="/employees/groups" component={Groups} />
            <Route exact path="/employees/tasks2" component={Tasks2} />

            <Route exact path="/employees/chat" component={Chat} />
            <Route exact path="/employees/chats" component={ChatS} />
            

           



        </Switch>
          );

    }
  
}

export default home;