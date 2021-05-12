import React, { Component } from 'react';
import '../../App.css';
import '../../config';
import { fire } from '../../config'
import firebase from 'firebase/app'
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import { InputGroup, InputGroupAddon, InputGroupText, Input, Container,Button } from 'reactstrap';

import logo from '../../Images/logo.png'
import mobile from '../../Images/mobile-phone.png'
import pwd from '../../Images/password.png'

import { ClipLoader } from "react-spinners";



class loginComponent extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            email: '',
            password: '',
            array: [],
            uid: '',
            userExists: false,
            loading: false,
            error: ''
        }
    }

    verify(e) {
        this.setState({ loading: true })
        this.setState({ error: '' })

        // console.log(this.state.email + this.state.password)

        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            // if(u.user.emailVerified==false){
            //     firebase.auth().currentUser.sendEmailVerification()
            //     this.setState({error: 'Verify your email before logging in we have sent you an email address on your registered email'})
            //     this.setState({loading: false})

            //     return 

            // }
            var uid = u.user.uid;
            this.setState({ uid: uid });
            console.log(uid);

            firebase.database().ref("Employees").once("value").then(snapShot => {
                snapShot.forEach(employee => {
                    
                        this.state.array.push(employee.val());
                

                });

                console.log(this.state.array)
                this.state.array.map((user) => {
                    if (user.id == this.state.uid) {
                        // if (user.verified) {
                        this.setState({ userExists: true });
                        localStorage.setItem("Employee", user.userName)
                        localStorage.setItem("Login", true)

                        // localStorage.setItem("Profile", user.profileImg)

                        localStorage.setItem("employeeId", user.id)
                        localStorage.setItem("email", this.state.email)
                        localStorage.setItem("userType", user.userType)


                        this.setState({ loading: false })
                        // }
                    }

                })

                if (this.state.userExists === true) {
                    console.log('user exists - logged in!')
                    // window.location.reload();

                } else {
                    fire.auth().signOut();
                    console.log('user does not exist - logged out!')
                    this.setState({ loading: false })
                    this.setState({ error: 'You Are Not Authorized!' })
                }
            })


        }).catch((error) => {
            console.log('wr')
            if (error) {
                this.setState({ loading: false })
                this.setState({ error: 'Password or Email Incorrect' })
            }
        })
    }

    render() {

        if (localStorage.getItem("Login")  && localStorage.getItem('userType')==0) {

            return <Redirect to="/admin/" />;
        } else {


        }

        return (


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

                        <div  className="input-container m-auto">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><img className='input-icon' src={mobile}></img></InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Email" type='email'  onChange={e=>this.setState({email:e.target.value})} />
                        </InputGroup>

                        <InputGroup className='padding-top-10'>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText><img className='input-icon'  src={pwd}></img></InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Password" type='password'  onChange={e=>this.setState({password:e.target.value})} />
                        </InputGroup>
                        
                        <InputGroup className='padding-top-10'>

                        <div class="col-md-12 mt-3 text-center">
                            <a onClick={e=>this.verify()} class="btn btn-success-gradiant text-white btn-md border-0 padding-btn font" href="#f1"><span>Login</span></a>
                        </div>
                        </InputGroup>

                        <div class="col-md-12 mt-3 text-center">
                            <p className='base-text '>Login as <a class="base-text" href="/login"><span className='base-color'>Employee</span></a>  </p>

                            {/* <p class="base-text"><a class="base-text" href=""><span className='base-color'>Sign Up</span></a> to register with us</p> */}

                        </div>

                        </div>

                     

                    </div>
                </div>

            </Container>


        );

    }
}

export default loginComponent;