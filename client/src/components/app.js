import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Register from './Register.jsx';
import Header from './Header.jsx';
import Login from './Login.jsx';
import Logout from './Logout.jsx';
import AddProduct from './AddProduct.jsx';
import Home from './Home.jsx';
import ShowProduct from './ShowProduct.jsx';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter> 
        <div>
          <Header />
          <Switch>
            <Route path="/product/:id" component={ShowProduct} />
            <Route path="/addproduct" component={AddProduct} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
