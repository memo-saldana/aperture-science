import AccountEmail from './AccountRecovery_Email';
import AccountPassword from './AccountRecovery_Password'
import Login from './Login';
import React from "react";
import Signup from './Signup';
import Themer from './ThemeSetter';
import ProjectView from './ProjectView';
import Account from './Account'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import TopNavbar from './TopNavbar';
import PaymentsTest from './PaymentsTest'

function App() {
  return (
    <Router>
      <Themer />
      <TopNavbar />
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/recovery-email" component={AccountEmail} />
        <Route path="/recovery-password" component={AccountPassword} />
        <Route path="/project" component={ProjectView} />
        <Route path="/account" component={Account} />
        <Route path="/test" component={PaymentsTest} />
      </Switch>
    </Router>
  );
}

export default App;
