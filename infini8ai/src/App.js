import logo from './logo.svg';
import './config.js'
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import landingPage from './layout/landing_page.js'
import Register from './Components/Auth/signup'
import Login from './Components/Auth/login'
import Admin from './admin/home.js'
import AdminLogin from './admin/Auth/login.js'

import Employee from './employees/home.js'








function App() {
  return (
    <div className="App">

      <Router>
        <Switch>
          <Route exact path="/" component={landingPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route  path="/adminlogin" component={AdminLogin} />

          <Route  path="/admin" component={Admin} />
          <Route  path="/employees" component={Employee} />
          

        



        </Switch>
      </Router>

    </div>
  );
}

export default App;
