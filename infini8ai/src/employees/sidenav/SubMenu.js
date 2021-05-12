import React, { Component } from 'react';
import '../../App.css';
import '../../config';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";


import { Container, NavItem, Table } from 'reactstrap';
import firebase from 'firebase'








class Sub extends Component {
    constructor() {
        super()
        this.state = {
            employees: []
        }
    }

    componentDidMount() {
        console.log(window.location.pathname);
        this.getEmployees()
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
                <h1 className='section-headings base-color padding-bottom-10'>User Verification</h1>

                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.state.employees.map((item, i) => {
                            return (
                                <tr>
                                    <th scope="row">{i + 1}</th>
                                    <td>{item.userName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.gendar}</td>

                                    {/* <td>{item.verified ? 'verified' : 'unverified'}</td> */}
                                    <td>

                                        {!item.verified &&
                                        <a onClick={e => this.verify(item.id)} class="btn btn-success-gradiant text-white btn-md border-0 padding-btn m-left font" href="#f1"><span>Accept</span></a>
                                        }

                                        <a class="btn btn-danger text-white btn-md border-0 font padding-btn m-left" href="#f1"><span>Decline</span></a>


                                    </td>

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

export default Sub;