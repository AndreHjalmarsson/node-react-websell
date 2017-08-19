import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ShowProduct extends Component {
  componentWillMount() {
    this.props.getProduct(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        Single product
        <div>{this.props.product ? this.props.product.title : null}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    product: state.product.singleProduct
  };
}

export default connect(mapStateToProps, actions)(ShowProduct);
