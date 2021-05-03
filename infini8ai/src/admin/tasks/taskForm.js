import React, { Component } from 'react';
import '../../App.css';
import '../../config';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { InputGroup, InputGroupAddon, InputGroupText, Input, Container, Button, DropdownMenu,UncontrolledDropdown ,DropdownToggle, DropdownItem } from 'reactstrap';









class addgroups extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            members: ''
        }
    }

    componentDidMount() {
        console.log(window.location.pathname);
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
                                <h1 className='login-text base-color text-center'>Add Groups</h1>
                            </div>

                            <InputGroup>
                            
                                <UncontrolledDropdown className=' w-100 border-blue base-color'>
                                    <DropdownToggle className=' w-100 dropdown base-color' caret>
                                        Select Group
                                     </DropdownToggle>
                                    <DropdownMenu className='w-100' >
                                        <DropdownItem header>Header</DropdownItem>
                                        <DropdownItem disabled>Action</DropdownItem>
                                        <DropdownItem>Another Action</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>Another Action</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>

                            </InputGroup>

                            
                            <InputGroup className='padding-top-10'>
                            
                                <UncontrolledDropdown className=' w-100 border-blue base-color '>
                                    <DropdownToggle className=' w-100 dropdown base-color' caret>
                                        Select Member
                                     </DropdownToggle>
                                    <DropdownMenu className='w-100' >
                                        <DropdownItem header>Header</DropdownItem>
                                        <DropdownItem disabled>Action</DropdownItem>
                                        <DropdownItem>Another Action</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>Another Action</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>

                            </InputGroup>

                            <InputGroup className='padding-top-10'>
                                <Input className='border-blue base-color' placeholder="Task" type='textarea' onChange={e => this.setState({ members: e.target.value })} />
                            </InputGroup>


                            <InputGroup className='padding-top-10'>
                                <div class="col-md-12 mt-3 text-center">
                                    <a onClick={e => this.verify()} class="btn btn-success-gradiant text-white btn-md border-0 padding-btn font" href="#f1"><span>Assign</span></a>
                                </div>
                            </InputGroup>

                        </div>
                    </div>
                </div>


            </Container>
        );

    }

}

export default addgroups;