import React, { Component } from 'react';
import firebase from 'firebase';

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
            
        }

    }

    componentDidMount() {

    }


  


     createRoom(){
       
        let childKey = firebase.database().ref("VideoRoom").push().getKey();
    
    
       
       { 
      
    
             firebase.database().ref("VideoRoom").child(childKey).set({
    
                // date: date,
                id: childKey,
                roomName:this.state.roomName,
                username:this.state.username,
                passcode:this.state.passcode,
                meetingId:this.state.meetingId
                // subject:sub,
                // token:token,
                // classId:localStorage.getItem("classId")
    
               
                
    
            })
        }
      }

    render() {

        return (
            <div style={{width:"40%", margin:"auto", marginTop:'15%'}} className="main-container">


<h1>Create Room</h1>

                <div class='width-60 margin-auto margin-bottom-10'>


                    <InputLabel htmlFor="input-with-icon-adornment">Name</InputLabel>
                    <Input
                        type="text"
                        id="field"
                        value={this.state.username}
                        onChange={e => this.setState({ username: e.target.value })}
                        required
                        style={{ width: '100%', marginBottom: '20px' }}

                    />

                </div>
                <div class='width-60 margin-auto margin-bottom-10'>


                    <InputLabel htmlFor="input-with-icon-adornment">Room Name</InputLabel>
                    <Input
                        type="text"
                        id="room"
                        value={this.state.roomName}
                        onChange={e => this.setState({ roomName: e.target.value })}
                        required
                        style={{ width: '100%', marginBottom: '20px' }}
                    />

                </div>

                <div class='width-60 margin-auto margin-bottom-10'>


                    <InputLabel htmlFor="input-with-icon-adornment">Meeting ID</InputLabel>
                    <Input
                        type="text"
                        id="subject"
                        value={this.state.meetingId}
                        onChange={e => this.setState({ meetingId: e.target.value })}
                        required
                        style={{ width: '100%', }}
                    />

                </div>

                <div class='width-60 margin-auto margin-bottom-10'>


                    <InputLabel htmlFor="input-with-icon-adornment">Passcode</InputLabel>
                    <Input
                        type="text"
                        id="subject"
                        value={this.state.passcode}
                        onChange={e => this.setState({ passcode: e.target.value })}
                        required
                        style={{ width: '100%', }}
                    />

                </div>

                <div style={{ marginTop: '20px' }} class='width-60 margin-auto margin-bottom-10 center'>

                    <Button color='primary' variant='outlined' onClick={e=>this.createRoom()}>Create Room</Button>

                </div>
            </div >
        )
    }

}
export default createMeeting;