import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={ props => (
    localStorage.getItem('token')
      ? <Component {...props} logoutHandler={rest.logoutHandler}/>
      : <Redirect to='/login' />
  )}/>
);

export default PrivateRoute;