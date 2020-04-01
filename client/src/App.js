import AccountEmail from './AccountRecovery_Email';
import AccountPassword from './AccountRecovery_Password'
import Login from './Login';
import React from "react";
import Signup from './Signup';
import Themer from './ThemeSetter';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'


function App() {
  return (
    <Router>
      <Themer />
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/recovery-email" component={AccountEmail} />
        <Route exact path="/recovery-password" component={AccountPassword} />
      </Switch>
    </Router>
  );
}

export default App;
