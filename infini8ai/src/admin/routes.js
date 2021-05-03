import React, {Component} from 'react';
import '../App.css';

import ResponsiveDrawer from './sidenav/sidenav.js'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import dashboardComponent from './dashboard/dashboard'
import { Container } from 'reactstrap';
import Dash from './dashboard/dashboard.js'
import Sub from './sidenav/SubMenu.js'
import Addgroups from './groups/groupForm.js'
import Groups from './groups/groups.js'
import AddTasks from './tasks/taskForm.js'









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
            <Route exact path="/admin" component={Dash} />
            <Route exact path="/admin/sub" component={Sub} />
            <Route exact path="/admin/groups" component={Groups} />

            <Route exact path="/admin/addgroups" component={Addgroups} />
            <Route exact path="/admin/addtasks" component={AddTasks} />





        </Switch>
          );

    }
  
}

export default home;