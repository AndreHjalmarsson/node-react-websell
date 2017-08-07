import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import ProductCard from './ProductCard';

class Home extends Component {

  componentDidMount() {
    this.props.getProducts();
    this.props.fetchCart();
  }

  productCard() {
    return this.props.products.map(product => {
    const { _id, title, description, type, price, photo, seller, created } = product;
      return (
        <div key={_id} className="col-md-4">
          <ProductCard key={_id} id={_id} title={title} description={description}
          type={type} price={price} photo={photo} seller={seller} created={created} 
          />
        </div>
      );
    });
  }

  render() {
    console.log(this.props.isInCart);
    return (
      <div>
        Home
        <div className="row">
          {this.props.products && this.productCard()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.product.allProducts,
    isInCart: state.cart.isInCart
  }
}

export default connect(mapStateToProps, actions)(Home);