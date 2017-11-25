import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import SearchField from './SearchField';
import ProductCard from './ProductCard';

class Home extends Component {
  componentDidMount() {
    this.props.getProducts();
    this.props.authed && this.props.getCurrentUser();
  }

  allProductsList() {
    return this.props.products.map(product => {
      const {
        _id,
        title,
        description,
        type,
        price,
        photo,
        seller,
        created
      } = product;
      return (
        <div key={_id} className="col-md-4">
          <ProductCard
            key={_id}
            id={_id}
            title={title}
            description={description}
            type={type}
            price={price}
            photo={photo}
            seller={seller}
            created={created}
            currentUser={this.props.currentUser._id}
          />
        </div>
      );
    });
  }

  searchProductsList() {
    return this.props.searchItems.map(product => {
      const {
        _id,
        title,
        description,
        type,
        price,
        photo,
        seller,
        created
      } = product;
      return (
        <div key={_id} className="col-md-4">
          <ProductCard
            key={_id}
            id={_id}
            title={title}
            description={description}
            type={type}
            price={price}
            photo={photo}
            seller={seller}
            created={created}
            currentUser={this.props.currentUser._id}
          />
        </div>
      );
    });
  }

  render() {
    const { searchItems, products, currentUser } = this.props;
    return (
      <div>
        Home
        <SearchField />
        <div className="row">
          {searchItems && currentUser && searchItems.length ? (
            this.searchProductsList()
          ) : (
            products && currentUser && this.allProductsList()
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.product.allProducts,
    searchItems: state.product.searchProducts,
    authed: state.auth.authed,
    currentUser: state.auth.current
  };
}

export default connect(mapStateToProps, actions)(Home);
