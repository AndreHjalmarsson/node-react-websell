import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../actions';
import { ROOT_URL } from '../actions/index.js';

class Header extends Component {
  componentDidMount() {
    this.props.authed && this.props.getCurrentUser();
  }

  renderLinks() {
    const { authed } = this.props;

    if (authed && this.props.currentUser) {
      return (
        <div>
          <ul className="nav navbar-nav">
            {/* <li className="nav-item pull-xs-right">
            <Link to="/logout" className="nav-link">
              Logout
            </Link>
          </li>
          <li className="nav-item pull-xs-right">
            <Link
              to={`/user/${this.props.currentUser._id}`}
              className="nav-link"
            >
              Profle
            </Link>
          </li> */}
            <li className="nav-item">
              <Link to="/addproduct" className="nav-link">
                Sell
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link">
                Cart
              </Link>
            </li>
          </ul>
          <div className="profile pull-xs-right">hej</div>
        </div>
      );
    } else {
      return (
        <div>
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
          </ul>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-light">
          <Link className="navbar-brand" to="/">
            WebSell
          </Link>
          {this.renderLinks()}
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authed: state.auth.authed,
    currentUser: state.auth.current
  };
}

export default connect(mapStateToProps, actions)(Header);
