import AccountEmail from './AccountRecovery_Email';
import AccountPassword from './AccountRecovery_Password';
import Account from './Account';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import CreateProject from './CreateProject';
import Failure from './Failure'
import Home from './Main';
import Login from './Login';
import MyProjects from './MyProjects';
import ProjectView from './ProjectView';
import React, { useState } from "react";
import Success from './Success';
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
        <Route path="/account" component={Account} />
        <Route path="/my-projects" component={MyProjects}/>
        <Route path="/success" component={Success}/>
        <Route path="/failure" component={Failure}/>
        <Route path="/*" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
