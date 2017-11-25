import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import * as actions from '../actions';
import { ROOT_URL } from '../actions/index.js';

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
  border-radius: 50%;
`;
const ImgWrapper = styled.div`
  background-color: #ededed;
  width: 36px;
  height: 36px;
`;
const HideList = styled.div`display: none;`;

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
          <div className="profile pull-xs-right">
            <Link to={`/user/${this.props.currentUser._id}`}>
              <ImgWrapper>
                <Img
                  src={`${ROOT_URL}/images/websell-profile.png`}
                  alt={'no photo'}
                />
              </ImgWrapper>
            </Link>
            <HideList className="hejsan">
              <li className="nav-item pull-xs-right">
                <Link to="/logout" className="nav-link">
                  Logout
                </Link>
              </li>
              <li className="nav-item pull-xs-right">
                <Link
                  className="nav-link"
                  to={`/user/${this.props.currentUser._id}`}
                >
                  Profle
                </Link>
              </li>
            </HideList>
          </div>
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
const hej = document.querySelector('.hejsan');
console.log(hej);

function mapStateToProps(state) {
  return {
    authed: state.auth.authed,
    currentUser: state.auth.current
  };
}

export default connect(mapStateToProps, actions)(Header);
