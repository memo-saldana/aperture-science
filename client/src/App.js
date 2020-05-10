import AccountEmail from './AccountRecovery_Email';
import AccountPassword from './AccountRecovery_Password';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import CreateProject from './CreateProject';
import Login from './Login';
import ProjectView from './ProjectView';
import React, { useState } from "react";
import Signup from './Signup';
import Themer from './ThemeSetter';
import TopNavbar from './TopNavbar';
import { getToken } from './TokenUtilities';

function App() {
  const [loggedIn, setLoggedIn] = useState(getToken());
  
  return (
    <Router>
      <Themer />
      <TopNavbar status={loggedIn} />
      <Switch>
        <Route
          path="/login"
          render = {(props) => (<Login {...props} loginHandler={setLoggedIn} />)}
        />
        <Route path="/signup" component={Signup}/>
        <Route path="/recovery-email" component={AccountEmail} />
        <Route path="/recovery-password" component={AccountPassword} />
        <Route path="/project" component={ProjectView} />
        <Route path="/create-project" component={CreateProject} />
      </Switch>
    </Router>
  );
}

export default App;
