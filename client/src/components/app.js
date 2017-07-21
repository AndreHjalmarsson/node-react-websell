import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Register from './Register.jsx';
import Header from './Header.jsx';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter> 
        <div>
          <Header />
          <Switch>
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
