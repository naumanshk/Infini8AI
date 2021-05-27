import React from "react";
import {

  Button,
  Input,
  InputLabel,
  Badge
} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import firebase from 'firebase'
import { Link, Redirect } from 'react-router-dom'
import MailIcon from '@material-ui/icons/Mail';
import axios from "axios";

const Chat = require("twilio-chat");
class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      room: "",
      accociated: [],
      chats: [],
      redirect: false,
      count: 0,
      notification: [],
      princi: [],
      redirect: false,
      chatWith: '',
      princiImg: '',
      employees: [],
      uid:'',
      newnotification: [
        {
          author: '',
          status: '',
          count: 0,
          memberSid: ''
        }
      ]
    };
  }

  componentDidMount = async () => {
    console.log('aya')
    await this.getNotifications()
    this.getEmployees()
    await this.login()
    console.log(this.state.chats)
    console.log('after chats')

    const { location } = this.props;
    const { state } = location || {};
    const { email, room, teacherName } = state || {};
    let token = "";
    let count = 0;





    try {
      token = await this.getToken(localStorage.getItem('testt@gmail.com'));
    } catch {
      throw new Error("unable to get token, please reload this page");
    }

    const client = await Chat.Client.create(token);





    try {
      this.state.chats.map((async items => {
        const channel = await client.getChannelByUniqueName(items.roomId);
        await this.joinChannel(channel);
        this.setState({ channel, loading: false });

      }))




    } catch {
      console.log('not joined')
    }
    

  }


  joinChannel = async (channel) => {
    if (channel.channelState.status !== "joined") {
      await channel.join();
    }

    channel.on("messageAdded", this.handleMessageAdded);
  };

  handleMessageAdded = (message) => {
    let count = 0;
    if (message.author != localStorage.getItem('email')) {


      console.log('new msg' + message.author + count)
      const { messages } = this.state;





      this.setState(
        {
          messages: !!messages ? [...messages, message] : [message], newnotification: { author: message.author, status: 'unread', count: this.state.newnotification.count + 1, memberSid: message.memberSid }
        },

        () => {
          console.log(this.state.messages)
          console.log(this.state.notification)
          // this.getUnread(this.state.notification)

          //   firebase.database().ref("textNotification").child(this.state.newnotification.memberSid).set({
          //     author:this.state.notification.author,
          //     status:this.state.notification.status,
          //     count:this.state.newnotification.count


          // })
        }

      );

    }

  };

  getToken = async (email) => {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/token/${email}`);
    const { data } = response;
    console.log(data.token)
    return data.token;
  };



  getNotifications = async () => {
    let notification = []
    firebase.database().ref("textNotification").once("value").then(snapshot => {
      console.log(snapshot.val())
      snapshot.forEach(user => {

        notification.push(user.val())

      })
      this.setState({
        notification: notification
      })


    })
  }



  login = async () => {

    // console.log(teacherName+teacherId)
    // console.log("studentID"+localStorage.getItem('Student') + localStorage.getItem('studentId'))
    // console.log(localStorage.getItem('studentId')+ teacherId)
    {

      await firebase.database().ref('TextChatting').once("value").then(snapshot => {
        snapshot.forEach(student => {
          student.forEach(teacher => {
            if (teacher.key == localStorage.getItem('teacherId')) {
              teacher.forEach(room => {
                console.log(room.val())
                this.setState(prevState => ({
                  chats: [...prevState.chats, room.val()]
                }))

              })
            }
          })
        })
      })


    }




  };

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


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  textByPrincipal = (empId, name, profileImg) => {

    {


      firebase.database().ref("TextChatting").child(localStorage.getItem('employeeId')).child(empId).child(localStorage.getItem('employeeId') + empId).set({

        roomId: localStorage.getItem('employeeId') + empId,
        date: new Date().toLocaleString(),
        EmployeeName: name,
        EmployeeId: empId,
        adminName: localStorage.getItem('Employee'),
        adminId: localStorage.getItem('employeeId'),
        author: localStorage.getItem('email'),
        profileImg: localStorage.getItem('Profile')



      }).then(this.setState({ redirect: true, uid:empId,room: localStorage.getItem('employeeId') + empId, chatWith: name, princiImg: profileImg, email: localStorage.getItem('email') }))
    }

  };

  render() {
    const { email, room } = this.state;
    if (this.state.redirect) {
      return <Redirect to={{ pathname: '/admin/chats', state: {uid:this.state.uid, room: this.state.room, email: localStorage.getItem('email'), chatWith: this.state.chatWith, profileOf: this.state.princiImg } }} />
    }
    // if (this.state.redirect) {
    //   return <Redirect to={{ pathname: '/student/chat', state:{room: this.state.room,email:'naumanshk3@gmail.com'} }}  />
    // }
    return (
      <div style={{ textAlign: "center", background: 'white' }}>


        <p style={{ fontSize: '16px' }} className='green' > Recived Messages</p>
        {this.state.employees.map((item, i) => {
          return (
            <div className='flex' style={{ flexDirection: 'row' }}>

              <div class='margin-auto margin-bottom-10' style={{ width: '80%' }}>




                <Card style={{ border: 'none', boxShadow: 'none', borderRadius: 'none' }} >


                  <div style={{ display: 'flex', justifyContent: 'space-around' }} >
                    <CardMedia
                      style={{ width: '50px', height: '50px', borderRadius: '50px' }}
                      image={item.profileImg ? item.profileImg : "/logo.png"}
                      title="Live from space album cover"
                    />
                    <CardContent >

                      <Typography variant="subtitle1" color="textSecondary">
                        {item.userName}
                      </Typography>

                    </CardContent>
                    <div style={{ paddingTop: '16px' }}>

                        <Badge onClick={e=>{this.textByPrincipal(item.id,item.userName,item.profileImg)}} variant='dot' color="error">
                          <MailIcon />
                        </Badge>



                    </div>


                  </div >

                </Card>


              </div>



            </div>
          )
        })}
      </div>
    );
  }
}

const styles = {
  header: {},
  grid: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  card: { padding: 40 },
  textField: { width: 300 },
  gridItem: { paddingTop: 12, paddingBottom: 12 },
  button: { width: 300 },
};

export default WelcomeScreen;
