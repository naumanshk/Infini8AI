import React, { Component } from 'react';
import '../../App.css';
import '../../config';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";


import { Container } from 'reactstrap';









class dashboard extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount() {
        console.log(window.location.pathname);
    }

    render() {
        if (!localStorage.getItem("Login")) {

            return <Redirect to="/adminlogin" />;
        } else {


        }

        return (
            <Container>

                <div>Nauman</div>
                

            </Container>
        );

    }

}

export default dashboard;