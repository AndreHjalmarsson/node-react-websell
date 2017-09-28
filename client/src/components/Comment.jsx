import React, { Component } from 'react';

class Comment extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.content}
        {this.props.author}
      </div>
    );
  }
}

export default Comment;
