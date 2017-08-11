import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

class Header extends Component {

  componentDidMount() {
    this.props.authed && this.props.getCurrentUser();
  }

  renderLinks() {
    const { authed } = this.props;

    if (authed && this.props.currentUser) {
      return (
        <div>
          {this.props.children}
          <li className="nav-item pull-xs-right">
            <Link to="/logout" className="nav-link">Logout</Link>
          </li>
           <li className="nav-item pull-xs-right">
            <Link to={`/user/${this.props.currentUser._id}`} className="nav-link">Profle</Link>
          </li> 
          <li className="nav-item">
            <Link to="/addproduct" className="nav-link">Sell</Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link">Cart</Link>
          </li>
        </div>
      );
    } else {
      return (
        <div>
          <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li className="nav-item">
          <Link to="/register" className="nav-link">Register</Link>
          </li>
        </div>
      );
    }
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <Link className="navbar-brand" to="/">WebSell</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authed: state.auth.authed,
    currentUser: state.auth.current
  }
}

export default connect(mapStateToProps, actions)(Header)