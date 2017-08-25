import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ShowProduct extends Component {
  componentWillMount() {
    this.props.getProduct(this.props.match.params.id);
  }

  renderProduct() {
    return (
      <div>
        {this.props.product.title}
        {this.props.product.photo}
      </div>
    );
  }

  render() {
    return (
      <div>
        Single product
        {this.props.product ? this.renderProduct() : null}
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
