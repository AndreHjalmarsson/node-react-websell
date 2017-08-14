import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class Profile extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    // If we change user when profile comp is mounted it will not remount since we're still on the same route
    // this is why we check if the url is changed with nextProps, if it is changed we make a new dispatch to the
    // backend with the updated params from the url
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
  };
}

export default connect(mapStateToProps, actions)(Profile);
