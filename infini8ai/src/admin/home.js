import React, {Component} from 'react';
import '../App.css';

import ResponsiveDrawer from './sidenav/sidenav.js'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import dashboardComponent from './dashboard/dashboard'
import { Container } from 'reactstrap';









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

        // if (localStorage.getItem("Teacher") == null ){
        //     console.log('null')
        //     return <Redirect to="/teacherlogin" />
        // }

        return (
            <React.Fragment>
                <Router >
                <div  >
                    <div>
              
                        <ResponsiveDrawer /> 
                    
                    </div>
                   
                    <div></div>
                </div>
                </Router>
            </React.Fragment>
          );

    }
  
}

export default home;