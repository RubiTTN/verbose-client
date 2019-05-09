import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Login from '../components/Login'
import Signup from '../components/Signup'

class UnAuthContent extends React.Component {
  render() {
    const {updateToken} = this.props;
    return (
      <Router>
      <Switch>
        <Route exact path="/" component={() => <Login updateToken={updateToken} />} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/" render={() => <Redirect to="/"/>}/>
      </Switch>
    </Router>
    )
  }
}

export default UnAuthContent;

