import logo from "./logo.svg";
import "./App.css";
import './config'; 
import Zoom from "./Zoom";
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// import createroom from './createroom.js'
// import Getroom from './joinroom.js'


function App() {
  const [joinMeeting, setJoinMeeting] = useState(false);
  return (
    <div className="App">

 
          {/* <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button style={{border: '1px solid #fff'}} onClick={() => setJoinMeeting(true)}>Join Meeting</button> */}

          <Router>
        <Switch>
          {/* <Route exact path="/create_room" component={createroom}  />    */}
          <Route exact path="/join" component={Zoom}  />   
          {/* <Route exact path="/getRoom" component={Getroom}  />    */}


          </Switch>
          </Router>

   
    </div>
  );
}

export default App;
