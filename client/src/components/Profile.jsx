import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Profile extends Component {

  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

	render() {
    this.props.user && console.log(this.props.user);
		return (
			<div>
				Profile
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps, actions)(Profile);
