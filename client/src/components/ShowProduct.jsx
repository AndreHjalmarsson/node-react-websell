import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Comment from './Comment';

class ShowProduct extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getProduct(this.props.match.params.id);
    this.props.getComments(this.props.match.params.id);
  }

  renderProduct() {
    return (
      <div>
        {this.props.product.title}
        {this.props.product.photo}
      </div>
    );
  }

  renderCommentForm() {
    return (
      <div>
        <form onSubmit={this.handleCommentForm.bind(this)}>
          <input type="text" ref={input => (this.textInput = input)} />
          <button type="submit">Post</button>
        </form>
      </div>
    );
  }

  handleCommentForm(event) {
    event.preventDefault();
    this.props.addComment(this.textInput.value, this.props.match.params.id);
  }

  render() {
    return (
      <div>
        Single product
        {this.props.product ? this.renderProduct() : null}
        <div>{this.renderCommentForm()}</div>
        {this.props.comments ? this.renderComments() : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    product: state.product.singleProduct,
    comments: state.comment.comments
  };
}

export default connect(mapStateToProps, actions)(ShowProduct);
