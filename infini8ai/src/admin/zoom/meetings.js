import React, { Component } from 'react';
import '../../App.css';
import '../../config';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";


import { Container, NavItem, Table } from 'reactstrap';
import firebase from 'firebase'


import { get } from 'axios'
require('dotenv').config()





class meetings extends Component {
    constructor() {
        super()
        this.state = {
            employees: [],
            meetings: []
        }
    }

    componentDidMount() {
        console.log(window.location.pathname);
        this.getEmployees()

        this.getData().then((response) => {

            this.setState({
                meetings: response.data,

            });
            console.log(response.data)

        });
    }

    getEmployees() {
        let employees = []

        firebase.database().ref("Employees").once("value").then(snapshot => {
            snapshot.forEach(employee => {
                if (employee.val().userType == 1) {
                    employees.push(employee.val())
                }

            })
            this.setState({ employees })
        })

    }

    getData() {
        const url = `${process.env.REACT_APP_API_KEY}/meetings`;
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return get(url, config)
    }
    verify(id) {

        firebase.database().ref("Employees").child(id).update(
            { verified: true }
        ).then(window.location.reload())
    }


    render() {
        if (!localStorage.getItem("Login")) {

            return <Redirect to="/adminlogin" />;
        }
        return (
            <Container>
                <h1 className='section-headings base-color padding-bottom-10'>Groups
                <div class="col-md-12 mt-3 ">
                        <a href='/admin/addmeetings' class="btn btn-success-gradiant text-white btn-md border-0 padding-btn font"><span>ADD</span></a>
                    </div>
                </h1>


                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Meeting ID</th>
                            <th>Passcode</th>



                        </tr>
                    </thead>
                    <tbody>
                        {this.state.meetings.map((item, i) => {
                            return (
                                <tr>
                                    <th scope="row">{i + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.meetingId}</td>
                                    <td>{item.passcode}</td>
                                    <td><div class="col-md-12 mt-3 ">
                                        <a href='https://us05web.zoom.us/signin#/previous' class="btn btn-success-gradiant text-white btn-md border-0 padding-btn font"><span>Join</span></a>
                                    </div></td>





                                    {/* <td>{item.verified ? 'verified' : 'unverified'}</td> */}

                                </tr>
                            )


                        })}

                        {/* <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>

                                <a class="btn btn-success-gradiant text-white btn-md border-0 padding-btn m-left font" href="#f1"><span>Accept</span></a>
                                <a class="btn btn-danger text-white btn-md border-0 padding-btn font m-left" href="#f1"><span>Decline</span></a>


                            </td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                            <td>

                                <a class="btn btn-success-gradiant text-white btn-md border-0 padding-btn m-left font" href="#f1"><span>Accept</span></a>
                                <a class="btn btn-danger text-white btn-md border-0 padding-btn font m-left" href="#f1"><span>Decline</span></a>



                            </td>
                        </tr> */}
                    </tbody>
                </Table>


            </Container>
        );

    }

}

export default meetings;