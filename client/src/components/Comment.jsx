import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Comment extends Component {
  render() {
    return;
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comment.comments
  };
}

export default connect(mapStateToProps, actions)(Comment);
