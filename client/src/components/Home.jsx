import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import SearchField from './SearchField';
import ProductCard from './ProductCard';

class Home extends Component {

  componentDidMount() {
    this.props.getProducts();
  }

  allProductsList() {
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

  searchProductsList() {
    return this.props.searchItems.map(product => {
      const { _id, title, description, type, price, photo, seller, created } = product;
    })
  }

  render() {
    this.props.searchItems && console.log(this.props.searchItems);
    return (
      <div>
        Home
        <SearchField />
        <div className="row">
          {
            this.props.searchItems ? this.searchProductsList()
            : this.props.products && this.allProductsList()
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.product.allProducts,
    searchItems: state.product.searchProducts
  }
}

export default connect(mapStateToProps, actions)(Home);