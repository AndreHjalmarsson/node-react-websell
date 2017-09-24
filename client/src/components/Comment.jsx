import React, { Component } from 'react';

class Comment extends Component {
  render() {
    return <div>{this.props.content}</div>;
  }
}

export default Comment;
