import React from "react";
import {
  AppBar,
  Backdrop,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  List,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";
import axios from "axios";
import ChatItem from "./ChatItem";
import  firebase from 'firebase'


const Chat = require("twilio-chat");

class ChatScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      messages: [],
      loading: false,
      channel: null,
      new:false,
      count:0,
      chatWith:'',
      profileImg:"",
      uid:'',
      fcmToken:''
    };

    this.scrollDiv = React.createRef();
  }

  getToken = async (email) => {
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/token/${email}`);
    const { data } = response;
    return data.token;
  };

  componentDidMount = async () => {
    const { location } = this.props;
    const { state } = location || {};
    const { email, room, teacherName } = state || {};

    let token = "";

    // if (!email || !room) {
    //   this.props.history.replace("/");
    // }




    this.setState({ loading: true,uid:this.props.location.state.uid ,
      chatWith:this.props.location.state.chatWith,profileImg:this.props.location.state.profileOf},()=>{this.getFCM()});

    try {
      token = await this.getToken(email);
    } catch {
      throw new Error("unable to get token, please reload this page");
    }

    const client = await Chat.Client.create(token);
// this.check(client)
    client.on("tokenAboutToExpire", async () => {
      const token = await this.getToken(email);
      client.updateToken(token);
    });

    client.on("tokenExpired", async () => {
      const token = await this.getToken(email);
      client.updateToken(token);
    });

    client.on("channelJoined", async (channel) => {
      // getting list of all messages since this is an existing channel
      const messages = await channel.getMessages();
      
      // console.log("chat screen"+messages.items[0].index)
      
      this.setState({ messages: messages.items || [] });
      this.scrollToBottom();
    });

    try {
      const channel = await client.getChannelByUniqueName(room);
      await this.joinChannel(channel);
      this.setState({ channel, loading: false });



    } catch {
      try {
        const channel = await client.createChannel({
          uniqueName: room,
          friendlyName: room,
        });
        await this.joinChannel(channel);
        this.setState({ channel, loading: false });
      } catch {
        throw new Error("unable to create channel, please reload this page");
      }
    }
  };

  joinChannel = async (channel) => {
    if (channel.channelState.status !== "joined") {
      await channel.join();
    }
    
    channel.on("messageAdded", this.handleMessageAdded);
  };

  handleMessageAdded = (message) => {
    
    if(message.author==localStorage.getItem('email')){

      console.log('new msg'+message.author)
    }
   
    const { messages } = this.state;
    this.setState(
      {
        messages: !!messages ? [...messages, message] : [message],count:this.state.count+1
      },
      ()=>{
        console.log(this.state.messages)
        console.log(this.state.count)
        
        this.scrollToBottom()
      }
     
    );
  };

  scrollToBottom = () => {
    const scrollHeight = this.scrollDiv.current.scrollHeight;
    const height = this.scrollDiv.current.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.scrollDiv.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  };

  sendMessage = () => {
    const { text, channel } = this.state;
    if (text && String(text).trim()) {
      this.setState({ loading: true });
      channel && channel.sendMessage(text);
      this.setState({ text: "", loading: false });
    }
    axios({
      method: 'post', //you can set what request you want to be
      url: 'https://fcm.googleapis.com/fcm/send',
      data:{
          notification:{
              "title":"New Notification",
              "body":"Notification by "+ localStorage.getItem('Employee'),
              "sound":"default"
          },
          data:{
              "param1":"value1"
          },
              "to":this.state.fcmToken,
              "priority":"high"
      },  
      headers: {
          Authorization: 'Bearer ' + 'AAAAyaoIwWQ:APA91bE77Zb-HPbG4QioR9QQZQgB0zzUPLzJeghL7rsJ0l7DRpXFn4kPOzLsTsK9H5u0GHZr1OrshKrtAcA6CbyZKyXPkz-mpnupQeYlLSfh22tWdrhs_3mLgL3VkU1DyWDKCuTziqtX'
      }
  }).then(res=>console.log("send"+res))
  };

  getFCM(){

    firebase.database().ref("FCM").once("value").then(snapshot => {
      snapshot.forEach(user=>{
        console.log(user.val())
        if(user.key==this.state.uid){
          this.setState({fcmToken:user.val().fcmToken})
        }
      })
    })
    }

  
  // check(chatClientInstance) {
  //   // navigator.serviceWorker.register('/serviceWorker.js')
  //   if (firebase && firebase.messaging()) {
  //     // requesting permission to use push notifications

  //     firebase.messaging().requestPermission().then(() => {
  //       // getting FCM token
  //       firebase.messaging().getToken({vapidKey: "BJj1KpwcyLWOYu5l_RBRsaSLjn5LXIQGlmYM6lmBBu1XAPUtmCrOn1VNwD_97u1boOxR04rk4mkaZuxDFpj_uuM"}).then((fcmToken) => {

  //         console.log(fcmToken)
  //         chatClientInstance.setPushRegistrationId('fcm', fcmToken);

  //         // registering event listener on new message from firebase to pass it to the Chat SDK for parsing
  //         firebase.messaging().onMessage(payload => {
  //           chatClientInstance.handlePushNotification(payload);
  //           console.log(payload)
  //         });

  //       }).catch((err) => {
  //         // can't get token
  //         console.log(err)
  //       });
  //     }).catch((err) => {
  //       console.log(err+"2")
  //       // can't request permission or permission hasn't been granted to the web app by the user
  //     });
  //   } else {
  //     // no Firebase library imported or Firebase library wasn't correctly initialized
  //   }
  // }

  render() {
    const { loading, text, messages, channel } = this.state;
    const { location } = this.props;
    const { state } = location || {};
    const { email, room, teacherName } = state || {};

  

    return (
      <Container component="main" maxWidth="md">
        <Backdrop open={loading} style={{ zIndex: 99999 }}>
          <CircularProgress style={{ color: "white" }} />
        </Backdrop>
        <AppBar style={{background:'#04B2AE'}} elevation={10}>
          <Toolbar style={{marginLeft:'250px'}}>
          <img  style={{width:'50px', height:'50px',marginRight:'10px'}} src={this.state.profileImg !=null ? this.state.profileImg : '/logo.png'}></img>
            <Typography variant="h6">
          
              {` ${this.state.chatWith}`}
            </Typography>
          </Toolbar>
        </AppBar>
        <CssBaseline />
        <Grid container direction="column" style={styles.mainGrid}>
          <Grid item style={styles.gridItemChatList} ref={this.scrollDiv}>
            <List dense={true}>
              {messages &&
                messages.map((message) => (
                  <ChatItem
                    key={message.index}
                    message={message}
                    email={email}

                  />
                ))}
            </List>
          </Grid>
          <Grid item style={styles.gridItemMessage}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item style={styles.textFieldContainer}>
                <TextField
                  required
                  style={styles.textField}
                  placeholder="Enter message"
                  variant="outlined"
                  multiline
                  rows={2}
                  value={text}
                  disabled={!channel}
                  onChange={(event) =>
                    this.setState({ text: event.target.value })
                  }
                />
              </Grid>
              <Grid item>
                <IconButton
                  style={styles.sendButton}
                  onClick={this.sendMessage}
                  disabled={!channel || !text}
                >
                  <Send style={styles.sendIcon} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const styles = {
  textField: { width: "100%", borderWidth: 0, borderColor: "transparent" },
  textFieldContainer: { flex: 1, marginRight: 12 },
  gridItem: { paddingTop: 12, paddingBottom: 12 },
  gridItemChatList: { overflow: "auto", height: "70vh",paddingTop:'50px'},
  gridItemMessage: { marginTop: 12, marginBottom: 12 },
  sendButton: { backgroundColor: "#3f51b5" },
  sendIcon: { color: "white" },
  mainGrid: {  borderWidth: 1 },
};

export default ChatScreen;
