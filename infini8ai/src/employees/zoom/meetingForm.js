import React, { Component } from 'react';
import '../../App.css';
import '../../config';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { InputGroup, InputGroupAddon, InputGroupText, Input, Container, Button, DropdownMenu, UncontrolledDropdown, DropdownToggle, DropdownItem } from 'reactstrap';


import { Multiselect } from 'multiselect-react-dropdown';

import { get, post } from 'axios'
import { FilterTiltShiftSharp } from '@material-ui/icons';
require('dotenv').config()





class addmeetings extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            meetingId:'',
            passcode: '',
            next: false
        }
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

    }

    getData() {
        const url = `${process.env.REACT_APP_API_KEY}/employee`;
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return get(url, config)
    }

    addMember() {
        this.setState({next:true})
        const data = {
            name: this.state.name,
            meetingId:this.state.meetingId,
            passcode:this.state.passcode
            
        };
        console.log(data)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        post(` ${process.env.REACT_APP_API_KEY}/meetings/add`,  data , config)
            .then(res => {
                console.log("done" + "" + res)
                window.location.reload()
            })



    }

    onSelect(selectedList, selectedItem) {
        console.log(selectedItem._id, this.state.name)



        const data = {
            user:selectedItem
        };
        console.log(data)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        post(` ${process.env.REACT_APP_API_KEY}/groups/addmem/${this.state.name}`,  data , config)
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
                                <h1 className='login-text base-color text-center'>Add Meetings</h1>
                            </div>

                           
                            <div>
                             <InputGroup>
                                <Input className='border-blue base-color' placeholder="Meeting Name" type='text' onChange={e => this.setState({ name: e.target.value })} />
                            </InputGroup>
                            <InputGroup style={{marginTop:'10px'}}>
                                <Input className='border-blue base-color' placeholder="Meeting ID" type='text' onChange={e => this.setState({ meetingId: e.target.value })} />
                            </InputGroup>
                            <InputGroup style={{marginTop:'10px'}}>
                                <Input className='border-blue base-color' placeholder="Meeting Passcode" type='text' onChange={e => this.setState({ passcode: e.target.value })} />
                            </InputGroup>

                                <InputGroup className='padding-top-10'>
                                <div class="col-md-12 mt-3 text-center">
                                    <a onClick={e => this.addMember()} class="btn btn-success-gradiant text-white btn-md border-0 padding-btn font" href="#f1"><span>ADD</span></a>
                                </div>
                            </InputGroup>
                            </div>

                       
                           
                        </div>
                    </div>
                </div>


            </Container>
        );

    }

}

export default addmeetings;