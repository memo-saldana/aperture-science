import './App.css';
import Login from './Login';
import Signup from './Signup';
import React from "react";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
      </Switch>
    </Router>
  );
}

export default App;
