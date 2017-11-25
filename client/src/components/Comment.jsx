import React, { Component } from 'react';

class Comment extends Component {
  render() {
    return (
      <div>
        {this.props.content}
        {this.props.name}
      </div>
    );
  }
}

export default Comment;
