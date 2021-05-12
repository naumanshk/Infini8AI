import React, { Component } from 'react';
import '../../App.css';
import '../../config';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { InputGroup, InputGroupAddon, InputGroupText, Input, Container, Button, DropdownMenu, UncontrolledDropdown, DropdownToggle, DropdownItem } from 'reactstrap';



import { Multiselect } from 'multiselect-react-dropdown';

import { get, post } from 'axios'

require('dotenv').config()




class addgroups extends Component {
    constructor() {
        super()
        this.state = {
            task: '',
            taskId: '',
            members: [],
            groups: [],
            next: false

        }
        this.onSelectMem = this.onSelectMem.bind(this)
        this.onSelect = this.onSelect.bind(this)


    }

    componentDidMount() {
        console.log(window.location.pathname);

        this.getData().then((response) => {

            this.setState({
                members: response.data,

            });
            console.log(response.data)

        });

        this.getGroups().then((response) => {

            this.setState({
                groups: response.data,

            });
            console.log(response.data)

        });

    }

    getData() {
        const url =  `${process.env.REACT_APP_API_KEY}/employee`;
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return get(url, config)
    }

    getGroups() {
        const url = `${process.env.REACT_APP_API_KEY}/groups`;
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return get(url, config)
    }

    addTask() {
        this.setState({ next: true })
        const data = {
            task: this.state.task,


        };
        console.log(data)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        post(`${process.env.REACT_APP_API_KEY}/tasks/add`, data, config)
            .then(res => {
                console.log("done" + "" + res.data)
                this.setState({ taskId: res.data })

            })

    }

    onSelectMem(selectedList, selectedItem) {
        console.log(selectedItem._id, this.state.taskId)


        const data = {
            user: selectedItem
        };
        console.log(data)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        post(` ${process.env.REACT_APP_API_KEY}/tasks/addmem/${this.state.taskId._id}`, data, config)
            .then(res => {
                console.log("done" + "" + res)
            })
    }

    onSelect(selectedList, selectedItem) {
        console.log(selectedItem._id, this.state.taskId)


        const data = {
            user: selectedItem
        };
        console.log(data)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        post(`${process.env.REACT_APP_API_KEY}/tasks/addGroups/${this.state.taskId._id}`, data, config)
            .then(res => {
                console.log("done" + "" + res)
            })
    }

    render() {
        // if (!localStorage.getItem("Login")) {

        //     return <Redirect to="/adminlogin" />;
        // } else {


        // }

        return (
            <Container>

                <div className='form-container m-auto'>
                    <div className='form-group'>
                        <div className="input-container m-auto">
                            <div className='login-title '>
                                <h1 className='login-text base-color text-center'>Assign Task</h1>
                            </div>
                            {!this.state.next &&
                                <div>
                                    <InputGroup className='padding-top-10'>
                                        <Input className='border-blue base-color' placeholder="Task" type='textarea'
                                            onChange={e => this.setState({ task: e.target.value })} />
                                    </InputGroup>


                                    <InputGroup className='padding-top-10'>
                                        <div class="col-md-12 mt-3 text-center">
                                            <a onClick={e => this.addTask()} class="btn btn-success-gradiant text-white btn-md border-0 padding-btn font" href="#f1"><span>Next</span></a>
                                        </div>
                                    </InputGroup>
                                </div>

                            }

                            {this.state.next &&
                                <div>
                                    <InputGroup className='padding-top-10'>
                                        <Multiselect
                                            options={this.state.members} // Options to display in the dropdown
                                            selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                            // onSelect={e=>this.addMember(this.state.members)} // Function will trigger on select event
                                            onSelect={this.onSelectMem}
                                            // onRemove={this.onRemove} // Function will trigger on remove event
                                            displayValue="userName" // Property name to display in the dropdown options
                                        />

                                    </InputGroup>
                                    <InputGroup className='padding-top-10'>
                                        <Multiselect
                                            options={this.state.groups} // Options to display in the dropdown
                                            selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                            // onSelect={e=>this.addMember(this.state.members)} // Function will trigger on select event
                                             onSelect={this.onSelect}
                                            // onRemove={this.onRemove} // Function will trigger on remove event
                                            displayValue="name" // Property name to display in the dropdown options
                                        />

                                    </InputGroup>

                                    <InputGroup className='padding-top-10'>
                                        <div class="col-md-12 mt-3 text-center">
                                            <a onClick={e => this.setState({ next: false })} class="btn btn-success-gradiant text-white btn-md border-0 padding-btn font" href="#f1"><span>Back</span></a>
                                            <a onClick={e => this.setState({ next: false })} class="btn btn-success-gradiant text-white btn-md border-0 padding-btn m-left font" href="#f1"><span>Done</span></a>

                                        </div>
                                    </InputGroup>
                                </div>
                            }




                            {/* <InputGroup className='padding-top-10'>
                                <div class="col-md-12 mt-3 text-center">
                                    <a onClick={e => this.verify()} class="btn btn-success-gradiant text-white btn-md border-0 padding-btn font" href="#f1"><span>Assign</span></a>
                                </div>
                            </InputGroup> */}

                        </div>
                    </div>
                </div>


            </Container>
        );

    }

}

export default addgroups;