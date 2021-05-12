import React, { Component } from 'react';
import '../../App.css';
import '../../config';
import firebase from 'firebase/app'
import 'firebase/auth'

import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { fire } from '../../config';
import * as firebaseui from 'firebaseui'
import logo from '../../Images/logo.png'
import mobile from '../../Images/mobile-phone.png'
import pwd from '../../Images/password.png'
import { InputGroup, InputGroupAddon, InputGroupText, Input, Container, Button } from 'reactstrap';

import { ClipLoader } from "react-spinners";

class signupComponent extends Component {
    constructor() {
        super();
        this.state = {
            verified: false,
            user: null,
            name: '',
            email: '',
            password: '',
            verifiedPassword: '',
            code: '',
            array: [],
            uid: '',
            userExists: false,
            loading: false,
            error: '',
            gender: null,
            schoolId: ''
        }
    }

    componentDidMount() {
        // this.renderFirebaseVerifications()
    }
    renderFirebaseVerifications = () => {
        console.log("dasdhash")
        let self = this;
        var uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    console.log(authResult)
                    let updated_phone = authResult.user.phoneNumber.replace("+92", "0")
                    console.log(updated_phone)
                    self.setState({ phone: updated_phone })
                    self.setState({ verified: false })
                    console.log(self.state)

                    // self.isVerified=true
                    // Do something with the returned AuthResult.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    return true;
                },
                signInFailure: function (error) {
                    console.log(error)
                    // Some unrecoverable error occurred during sign-in.
                    // Return a promise when error handling is completed and FirebaseUI
                    // will reset, clearing any UI. This commonly occurs for error code
                    // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
                    // occurs. Check below for more details on this.
                    // return handleUIError(error);
                },
            },
            signInOptions: [{
                // Leave the lines as is for the providers you want to offer your users.
                provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                defaultCountry: 'PK',
            }
            ],
            // tosUrl and privacyPolicyUrl accept either url string or a callback
            // function.
            // Terms of service url/callback.
            tosUrl: function () {
                // self.$router.push({path:'/terms-and-conditions'})
                // window.location.assign('/terms-and-conditions');
            },
            // Privacy policy url/callback.
            privacyPolicyUrl: function () {
                // self.$router.push({path:'/terms-and-conditions'})
                // window.location.assign('/terms-and-conditions');
            }
        };

        // Initialize the FirebaseUI Widget using Firebase.
        var ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());//new firebaseui.auth.AuthUI(firebase.auth());
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);

    }


    register() {
        var uid;
        var codeVerified;
        codeVerified = false;

        if (this.state.password !== this.state.verifiedPassword) {
            this.setState({ error: "Passwords do not match! Try again..." })
            return;
        } else if (this.state.gender == null) {
            this.setState({ error: "Please select your gender!" })
            return;
        } else if (this.state.password.length < 6) {
            this.setState({ error: "Password should be atleast 6 charachters" })
            return;
        }

        // firebase.database().ref("School").once("value").then(snapshot => {
        //     console.log(snapshot.val())
        //     snapshot.forEach(organization => {
        //         organization.forEach(school => {
        //             if (school.val().refId == this.state.code){
        //                 codeVerified = true;
        //                 this.setState({schoolId: school.key})
        //             }
        //         })
        //     })
        if (true) {
            fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(u => {
                console.log(u)
                firebase.auth().currentUser.sendEmailVerification()

                uid = u.user.uid;
                firebase.database().ref("Employees").child(uid).set({
                    email: this.state.email,
                    // forigenKey: this.state.schoolId,
                    gendar: this.state.gender == 'male' ? 'Male' : 'Female',
                    id: u.user.uid,
                    // refId: this.state.code,
                    status: false,
                    profileImg: "no",
                    userName: this.state.name,
                    userType: 1,
                    verified: false


                }).then(() => {
                    this.props.history.push('/')
                })
            }).catch(error => {
                console.log(error)
            })

        } else {
            this.setState({ error: "Code Incorrect!" })
        }
        // })



    }

    render() {
        return (
            <div>

                {this.state.verified == true && <div style={{ backgroundColor: 'white', maxWidth: 400, margin: 'auto', marginTop: '10vh', marginBottom: '10vh', textAlign: 'center', borderRadius: 10, boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.3)' }} id="firebaseui-auth-container"></div>}

                {this.state.verified == false && <div className="half-grid-t">


                    <Container >
                        <div className='form-container m-auto'>
                            <div className='form'>

                                <div className='login-title btn-success-gradiant'>

                                    <h1 className='login-text text-white text-center'>Login</h1>
                                    <h1 className='login-text text-white text-center'>As Admin</h1>

                                </div>



                                <div className='logo-container'>


                                    <img className='login-logo' src={logo}></img>

                                    <ClipLoader

                                        size={25}

                                        color={"#15A73F"}
                                        loading={this.state.loading}
                                    />
                                    <h3 className="text-red base-text text-center">{this.state.error}</h3>
                                </div>

                                <div className="input-container m-auto">
                                <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><img className='input-icon' src={mobile}></img></InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Enter Name" type='text' onChange={e => this.setState({ name: e.target.value })} />
                                    </InputGroup>

                                    <InputGroup  className='padding-top-10'>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><img className='input-icon' src={mobile}></img></InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Email" type='email' onChange={e => this.setState({ email: e.target.value })} />
                                    </InputGroup>

                                    <InputGroup className='padding-top-10'>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><img className='input-icon' src={pwd}></img></InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Password" type='password' onChange={e => this.setState({ password: e.target.value })} />
                                    </InputGroup>
                                    <InputGroup className='padding-top-10'>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><img className='input-icon' src={pwd}></img></InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="Confirm Password" type='password' onChange={e => this.setState({ verifiedPassword: e.target.value })} />
                                    </InputGroup>

                                    <FormControl component="fieldset" >

                                        <RadioGroup aria-label="gender" name="gender1" value={this.state.gender} onChange={(e) => {
                                            this.setState({ gender: e.target.value })
                                            console.log(e.target.value)
                                        }}>
                                            <div className="flex">
                                                <FormLabel style={{ marginTop: '12px', marginRight: '20px' }} component="legend">Select Gender</FormLabel>
                                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                                <FormControlLabel value="female" control={<Radio />} label="Female" />


                                            </div>
                                        </RadioGroup>
                                    </FormControl>

                                    <InputGroup className=''>

                                        <div class="col-md-12 mt-3 text-center">
                                            <a onClick={e => this.register()} class="btn btn-success-gradiant text-white btn-md border-0 padding-btn font" href="#f1"><span>Register</span></a>
                                        </div>
                                    </InputGroup>



                                    <div class="col-md-12 mt-3 text-center">
                                        {/* <p className='base-text '>Login as <a class="base-text" href="/login"><span className='base-color'>Employee</span></a>  </p> */}

                                        <p class="base-text"> Already have an account <a class="base-text" href="/login"><span style={{cursor:'pointer'}} className='base-color'>Login</span> </a></p>

                                    </div>

                                </div>



                            </div>
                        </div>

                    </Container>
                </div>



                }
            </div>
        );

    }

}

export default signupComponent;