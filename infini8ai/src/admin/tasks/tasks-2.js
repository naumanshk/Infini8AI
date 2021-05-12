import React, { Component } from 'react';
import '../../App.css';
import '../../config';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { Container, NavItem, Table } from 'reactstrap';
import firebase from 'firebase'


import { get, put } from 'axios'
require('dotenv').config()




class Tasks extends Component {
    constructor() {
        super()
        this.state = {
            employees: [],
            tasks: [],
            pending: [],
            inprogress: [],
            completed: []
        }
    }

    componentDidMount() {
        console.log(window.location.pathname);
        this.getEmployees()

        this.getData().then((response) => {
            console.log(response.data)


            this.setState({
                tasks: response.data,

            }, () => {
                var pending = []
                var inprogress = []
                var completed = []


                this.state.tasks.forEach(task => {

                    if (task.pending && !task.inprogress && !task.completed) {
                        pending.push(task)
                    }
                    if (task.inprogress && !task.completed) {
                        inprogress.push(task)

                    }
                    if (!task.pending && !task.inprogress && task.completed) {
                        completed.push(task)

                    }
                })
                this.setState({ pending, inprogress, completed })
            });
            console.log(response.data)



        });
        console.log(process.env.REACT_APP_API_KEY)
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
        const url = `${process.env.REACT_APP_API_KEY}/tasks`;
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return get(url, config)
    }

    updateProgress(id) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const up = {
            inprogress: true,
        };

        put(`${process.env.REACT_APP_API_KEY}/tasks/update/` + id, up, config).then(res => { window.location.reload() });
    }
    updateComplete(id) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const up = {
            completed: true,
            inprogress: false,
            pending: false
        };

        put(`${process.env.REACT_APP_API_KEY}/tasks/update/` + id, up, config).then(res => { window.location.reload() });
    }

    verify(id) {

        firebase.database().ref("Employees").child(id).update(
            { verified: true }
        ).then(window.location.reload())
    }


    render() {
        // if (!localStorage.getItem("Login")) {

        //     return <Redirect to="/adminlogin" />;
        // }
        return (
            <Container>
                <h1 className='section-headings base-color padding-bottom-10'>Tasks
                <div class="col-md-12 mt-3 ">
                        <a href='/admin/addtasks' class="btn btn-success-gradiant text-white btn-md border-0 padding-btn font"><span>ADD</span></a>
                    </div>
                </h1>

                <div className='task-container'>
                    <div className='task-assiigned'>
                        <h6 className=' base-color padding-bottom-10'>Assigned</h6>

                        {this.state.pending.map(items => {
                            return (
                                <div className='task-card'>
                                    <p className=' base-color padding-bottom-10'>{items.task}</p>
                                    <a onClick={e => this.updateProgress(items._id)} className='progress-btn btn-success-gradiant font text-black '>Inprogress</a>
                                    {/* <img style={{ width: '100px', height: '80px' }} src='/image.png'></img> */}

                                    <div style={{ paddingTop: '10px' }}>
                                        {items.members.length > 0 &&


                                            items.members.map((mem, m) => {
                                                return (

                                                    <p style={{ padding: '0px', margin: 0 }} className=' base-color '>{mem.user.userName} |
                                                        <span style={{ color: 'red' }}> May 3</span></p>

                                                )
                                            })

                                        }
                                    </div>
                                </div>

                            )
                        })}


                    </div>

                    <div className='task-assiigned'>
                        <h6 className=' base-color padding-bottom-10'>Inprogress</h6>


                        {this.state.inprogress.map(items => {
                            return (
                                <div className='task-card'>
                                    <p className=' base-color padding-bottom-10'>{items.task}</p>
                                    <a onClick={e => this.updateComplete(items._id)} className='progress-btn btn-success-gradiant font text-black '>Completed</a>
                                    {/* <img style={{ width: '100px', height: '80px' }} src='/image.png'></img> */}

                                    <div style={{ paddingTop: '10px' }}>
                                        {items.members.length > 0 &&


                                            items.members.map((mem, m) => {
                                                return (

                                                    <p style={{ padding: '0px', margin: 0 }} className=' base-color '>{mem.user.userName} |
                                                        <span style={{ color: 'red' }}> May 3</span></p>

                                                )
                                            })

                                        }
                                    </div>
                                </div>

                            )
                        })}




                    </div>

                    <div className='task-assiigned'>
                        <h6 className=' base-color padding-bottom-10'>Completed</h6>

                        {this.state.completed.map(items => {
                            return (
                                <div className='task-card'>
                                    <p className=' base-color padding-bottom-10'>{items.task}</p>
                                    {/* <a onClick={e => this.updateComplete(items._id)} className='progress-btn btn-success-gradiant font text-black '>Completed</a> */}
                                    {/* <img style={{ width: '100px', height: '80px' }} src='/image.png'></img> */}
                                    <div style={{ paddingTop: '10px' }}>
                                        {items.members.length > 0 &&


                                            items.members.map((mem, m) => {
                                                return (

                                                    <p style={{ padding: '0px', margin: 0 }} className=' base-color '>{mem.user.userName} |
                                                        <span style={{ color: 'red' }}> May 3</span></p>

                                                )
                                            })

                                        }
                                    </div>
                                </div>

                            )
                        })}



                    </div>

                </div>


            </Container>
        );

    }

}

export default Tasks;