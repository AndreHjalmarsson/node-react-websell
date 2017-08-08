import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'; 

import ProductCard from './ProductCard';

class Cart extends Component {

  componentDidMount() {
    this.props.fetchCart();
  }

  productCard() {
    return this.props.productsInCart.map(product => {
      const { _id, title, description, type, price, photo, seller, created } = product;
      return (
        <div key={_id} className="col-md-4">
          <ProductCard key={_id} id={_id} title={title} description={description}
            type={type} price={price} photo={photo} seller={seller} created={created}
            productsInCart={this.props.productsInCart}
          />
        </div>
      );
    });
  }

  render() {
    return <div>
      my cart
      <div className="row">
        {this.props.productsInCart && this.productCard()}
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    productsInCart: state.cart.productsInCart
  }
}

export default connect(mapStateToProps, actions)(Cart);