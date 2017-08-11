import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Profile extends Component {

	render() {
		return (
			<div>
				Profile
			</div>
		);
	}
}

export default connect(null, actions)(Profile);
