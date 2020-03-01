import './App.css';
import Login from './Login';
import Signup from './Signup';
import AccountEmail from './AccountRecovery_Email';
import AccountPassword from './AccountRecovery_Password'
import React from "react";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/accountrec_email" component={AccountEmail} />
        <Route path="/accountrec_password" component={AccountPassword} />
      </Switch>
    </Router>
  );
}

export default App;
