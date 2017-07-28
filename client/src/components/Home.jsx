import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import ProductCard from './ProductCard';

class Home extends Component {

  componentWillMount() {
    this.props.getProducts();
  }

  productCard() {
    return this.props.products.map(product => {
    const { _id, title, description, type, price, photo, seller, created } = product;
      return (
        <div key={_id}>
          <ProductCard key={_id} id={_id} title={title} description={description}
          type={type} price={price} photo={photo} seller={seller} created={created} 
          />  
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        Home
        {this.props.products ? this.productCard() : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.product.allProducts
  }
}

export default connect(mapStateToProps, actions)(Home);