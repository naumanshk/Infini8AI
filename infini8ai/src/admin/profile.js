import React, { Component } from 'react';
import '../App.css';
import '../config';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { InputGroup, InputGroupAddon, InputGroupText, Input, Container, Button, DropdownMenu, UncontrolledDropdown, DropdownToggle, DropdownItem } from 'reactstrap';
import firebase from 'firebase'


import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import { Multiselect } from 'multiselect-react-dropdown';
import logo from '../Images/logo.png'
import { get, post } from 'axios'
import storage from '../config'

require('dotenv').config()




class addgroups extends Component {
    constructor() {
        super()
        this.state = {


            email: '',
            name: '',
            gendar: '',
            editable: false,
            err: false,
            image: '',
            uploaded: '',
            imgURL: '',
        }


    }

    componentDidMount() {
        this.getProfile()

    }

    getProfile() {
        let { teacher } = this.state;
        teacher = []
        firebase.database().ref("Employees").once("value").then(snapshot => {
            snapshot.forEach(user => {
                console.log(user.val())
                if (user.key == localStorage.getItem("employeeId")) {

                    this.setState({ name: user.val().userName, email: user.val().email, gendar: user.val().gendar, profileImg: user.val().profileImg })


                }

            })
            this.setState({ teacher })
        })
    }


    fileUpload() {
        let { image } = this.state;
        const upload = storage.ref(`Profile/${localStorage.getItem('employeeId')}`).put(image);
        upload.on('state_changed',
            (snapshot) => {
                console.log('done')
            },
            (error) => {
                console.log(error);
            },
            () => {
                storage.ref(`Profile/${localStorage.getItem('employeeId')}`).getDownloadURL().then(url => {
                    console.log(url);
                    this.setState({ imgURL: url });
                    this.setState({ uploaded: "Uploaded" })
                })
            });
    }


    editProfile() {



        if (this.state.name == "" || this.state.gender == "" || this.state.email == "") {

            this.setState({ err: true })

        }
        else {
            firebase.database().ref("Employees").child(localStorage.getItem("employeeId")).update({



                userName: this.state.name,
                gendar: this.state.gendar,
                email: this.state.email,

                profileImg: this.state.imgURL


            }).then(window.location.reload())
        }
    }



    render() {

        return (
            <Container>

                <div className='form-container m-auto'>
                    <div className='form-group'>
                        <div className="input-container m-auto">
                            <div className='login-title '>
                                <h1 className='login-text base-color text-center'>Profile</h1>
                            </div>

                            <div className="container">


                                <div className='container flex justify-center'>


                                    {/* list of classes */}
                                    <div className="section-container-p width-40 width-100" >


                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <img src={this.state.profileImg != null ? this.state.profileImg : logo} style={{ marginRight: '10px', width: '50px', height: '50px', borderRadius: '50px' }} className=""></img>

                                            <h2 style={{ textTransform: 'capitalize' }} class='center  student-grey relative' >{this.state.name}
                                            </h2>
                                        </div>
                                        <div style={{display:'flex', justifyContent: 'flex-end',marginTop:'10px' }} className='flex'>
                                            {!this.state.editable ?
                                                <Button

                                                    className='btn btn-success-gradiant text-white btn-md border-0 padding-btn font'
                                                    variant="outlined" size="medium" color="primary"
                                                    startIcon={<EditIcon />}
                                                    onClick={e => this.setState({ editable: true })}
                                                >
                                                    Edit Profile
                                </Button>

                                                :

                                                <Button
                                                    style={{ justifyContent: 'flex-end' }}
                                                    variant="outlined" size="medium" color="secondary"
                                                    startIcon={<CancelIcon />}
                                                    onClick={e => this.setState({ editable: false, err: false })}
                                                >
                                                    Cancel
                                </Button>
                                            }
                                        </div>



                                        <hr></hr>

                                        <div style={{ paddingTop: '40px', paddingBottom: '40px', height: 'auto' }} className="inventory-values">



                                            <div class='width-80 margin-auto margin-bottom-10'>
                                                {this.state.err && <h3 className="red">Please Fill all the fileds!</h3>}

                                                <InputGroup>
                                                    <Input
                                                        value={this.state.name}
                                                        className='border-blue base-color'
                                                        placeholder="Name" type='text'
                                                        disabled={!this.state.editable ? true : false}

                                                        onChange={e => this.setState({ name: e.target.value })} />
                                                </InputGroup>
                                            </div>

                                            <div class='width-80 margin-auto margin-bottom-10'>
                                                {/* {this.state.err && <h3 className="red">Please Fill all the fileds!</h3>} */}
                                                <InputGroup className='padding-top-10'>
                                                    <Input
                                                        value={this.state.email}
                                                        disabled={!this.state.editable ? true : false}

                                                        className='border-blue base-color'
                                                        placeholder="Email" type='text'

                                                        onChange={e => this.setState({ email: e.target.value })} />
                                                </InputGroup>

                                            </div>

                                            <div class='width-80 margin-auto margin-bottom-10'>
                                                {/* {this.state.err && <h3 className="red">Please Fill all the fileds!</h3>} */}

                                                <InputGroup className='padding-top-10'>
                                                    <Input
                                                        value={this.state.gendar}
                                                        disabled={!this.state.editable ? true : false}
                                                        className='border-blue base-color'
                                                        placeholder="Gendar" type='text'
                                                        onChange={e => this.setState({ gendar: e.target.value })} />
                                                </InputGroup>
                                            </div>







                                            {this.state.editable && <div class='width-80 margin-auto margin-bottom-10'>



                                                <input className='padding-top-10' class="upload-img" style={{ height: '30px', marginTop: '10px' }}
                                                    type="file" onChange={(e) => {
                                                        var { image } = this.state;
                                                        image = e.target.files[0]
                                                        this.setState({ image })
                                                        console.log(image)
                                                    }}></input>

                                                {/* backgroundImage: `url(${uploadImg})`,  */}
                                                <button clasName='white font' style={{ background: '#0EB5B1', marginTop: '10px' }} onClick={() => { this.fileUpload() }}>Upload</button>
                                                <p>{this.state.uploaded}</p>
                                            </div>}


                                            <div class='width-80 margin-auto margin-bottom-10'>
                                                {/* {this.state.err && <h3 className="red">Please Fill all the fileds!</h3>} */}

                                                {this.state.editable && <button onClick={e => this.editProfile()} className='btn btn-success-gradiant text-white btn-md border-0 padding-btn font'
                                                >Save</button>}

                                            </div>









                                        </div>
                                    </div>
                                </div>
                            </div>




                        </div>
                    </div>
                </div>


            </Container>
        );

    }

}

export default addgroups;