import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import AddProduct from './AddProduct';

class EditProduct extends Component {

  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
  }

  renderProductForm() {
    const { _id, title, description, price, type, photo } = this.props.product;

    let initialValues = {
      initialValues: {
        title,
        description,
        type,
        price
      }
    };
    return (
      <AddProduct id={_id} {...initialValues} photo={photo} ifEdit={true} />
    );
  }

  render() {
    return (
      <div>
        Edit Product
        <div>
          {this.props.product ? this.renderProductForm() : 'No such product found...'}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    product: state.product.singleProduct
  }
}

export default connect(mapStateToProps, actions)(EditProduct);