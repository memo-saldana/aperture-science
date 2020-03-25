import AccountEmail from './AccountRecovery_Email';
import AccountPassword from './AccountRecovery_Password'
import Login from './Login';
import React from "react";
import Signup from './Signup';
import Themer from './ThemeSetter';
import ProjectView from './ProjectView';
import CreateProject from './CreateProject';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import TopNavbar from './TopNavbar';

function App() {
  return (
    <Router>
      <Themer />
      <TopNavbar />
      <Switch>
<<<<<<< HEAD:client/src/App.js
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/recovery-email" component={AccountEmail} />
        <Route exact path="/recovery-password" component={AccountPassword} />
=======
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/recovery-email" component={AccountEmail} />
        <Route path="/recovery-password" component={AccountPassword} />
        <Route path="/project" component={ProjectView} />
<<<<<<< HEAD:client/src/App.js
>>>>>>> Started the template for the projects:aperture-funding/src/App.js
=======
        <Route path="/create-project" component={CreateProject} />
>>>>>>> Create scaffolding for Create Project page:aperture-funding/src/App.js
      </Switch>
    </Router>
  );
}

export default App;
