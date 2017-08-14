import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Profile extends Component {

  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.getUser(nextProps.match.params.id);
    }
  }

	render() {
		return (
			<div>
				Profile
        {this.props.user && this.props.user.name}
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
