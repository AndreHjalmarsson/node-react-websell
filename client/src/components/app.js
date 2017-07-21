import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Register from './Register.jsx';
import Header from './Header.jsx';
import Login from './Login.jsx';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter> 
        <div>
          <Header />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
