import React, { Component } from 'react';
import firebase from 'firebase';
import {  Link } from "react-router-dom";

import './App.css';
import './config';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';



import 'firebase/storage';


class createMeeting extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            roomName: '',
            meetingId: '',
            passcode: '',
            allrooms: []
        }

    }

    componentDidMount() {
        this.getRoom()
    }





    getRoom() {


        var allrooms = []
        {

            firebase.database().ref("VideoRoom").once("value").then(snapshot => {


                snapshot.forEach(room => {




                    allrooms.push(room.val())





                })


                this.setState({ allrooms })
            })
        }
    }

    render() {

        return (
            <div style={{ width: "40%", margin: "auto", marginTop: '15%' }} className="main-container">

                {this.state.allrooms.map((item) => {
                    return (
                        <div className='flex' style={{ display: 'flex', flexDirection: 'row' }}>


                            <div class='margin-auto margin-bottom-10'>


                                <InputLabel htmlFor="input-with-icon-adornment">Room Name</InputLabel>
                                <Input
                                    type="text"
                                    id="room"
                                    value={item.roomName}

                                    required

                                />

                            </div>

                            <div class='margin-auto margin-bottom-10'>


                                <InputLabel htmlFor="input-with-icon-adornment">Teacher</InputLabel>
                                <Input
                                    type="text"
                                    id="subject"
                                    value={item.username}

                                    required

                                />

                            </div>

                            <div class='margin-auto margin-bottom-10'>


                                <InputLabel htmlFor="input-with-icon-adornment">Meeting ID</InputLabel>
                                <Input
                                    type="text"
                                    id="subject"
                                    value={item.meetingId}

                                    required

                                />

                            </div>

                            <div class=' margin-auto margin-bottom-10 center'>
                            <Link to={{
                                                pathname: '/join',
                                                state: {
                                                    meetingId: item.meetingId,
                                                    pwd: item.passcode

                                                }

                                            }}>
                           Join Room</Link>



                            </div>


                        </div>
                    )
                })}
            </div >

        )


    }

}
export default createMeeting;