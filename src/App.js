import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import './App.css';
import Index from './containers/Index';
import Login from './containers/Login';
import Logout from './containers/Logout';
import Publishers from './containers/Publishers';
import _ from 'lodash';

class App extends Component {

  render() {
   
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Index} >
          <IndexRoute component={Publishers} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
        </Route>
      </Router>
    );
  }
}

export default App;
