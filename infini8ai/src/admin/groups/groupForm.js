import React, { Component } from 'react';
import '../../App.css';
import '../../config';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { InputGroup, InputGroupAddon, InputGroupText, Input, Container, Button, DropdownMenu, UncontrolledDropdown, DropdownToggle, DropdownItem } from 'reactstrap';


import { Multiselect } from 'multiselect-react-dropdown';

import { get, post } from 'axios'





class addgroups extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            members: [],
            selectedValue: [],
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
        const url = 'http://localhost:4000/consumer';
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
            

        };
        console.log(data)
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        post(`http://localhost:4000/groups/add/${this.state.name}`, { data }, config)
            .then(res => {
                console.log("done" + "" + res)
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
        post(`http://localhost:4000/groups/addmem/${this.state.name}`, { data }, config)
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
                                <h1 className='login-text base-color text-center'>Add Groups</h1>
                            </div>

                            {!this.state.next &&
                            <div>
                             <InputGroup>
                                <Input className='border-blue base-color' placeholder="Group Name" type='text' onChange={e => this.setState({ name: e.target.value })} />
                            </InputGroup>

                                <InputGroup className='padding-top-10'>
                                <div class="col-md-12 mt-3 text-center">
                                    <a onClick={e => this.addMember()} class="btn btn-success-gradiant text-white btn-md border-0 padding-btn font" href="#f1"><span>Next</span></a>
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
                                 onSelect={this.onSelect}
                                 // onRemove={this.onRemove} // Function will trigger on remove event
                                 displayValue="userName" // Property name to display in the dropdown options
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
                           



                        

                        </div>
                    </div>
                </div>


            </Container>
        );

    }

}

export default addgroups;