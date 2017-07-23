import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Hidden extends Component {

  componentWillMount() {
    this.props.getIndex();
  }

  render() {
    return (
      <div>
        Hidden
        {this.props.getMessage}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    getMessage: state.auth.getMessage
  }
}

export default connect(null, actions)(Hidden);