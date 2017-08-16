import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import AddProduct from './AddProduct';

class EditProduct extends Component {

  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
  }

  renderProductForm() {
    const { title, description, price, type } = this.props.product;
    return (
      <AddProduct title={title} description={description} price={price} type={type} />
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

// export default reduxForm({
//   validate,
//   form: 'editProductForm'
// })(
//   connect(mapStateToProps, actions)(EditProduct)
//   );