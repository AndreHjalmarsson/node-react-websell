import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {

  renderLinks() {
    const { authed } = this.props;

    if (authed) {
      return (
        <div>
          welcome
        </div>
      );
    } else {
      return (
        <div>
          <li className="nav-item">
          <Link to="/register" className="nav-link">Register</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
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
    authed: state.auth.authed
  }
}

export default connect(mapStateToProps)(Header)