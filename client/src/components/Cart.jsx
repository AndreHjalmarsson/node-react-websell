import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'; 

class Cart extends Component {

  componentDidMount() {
    this.props.fetchCart();
  }

  render() {
    return <div>
      my cart
    </div>
  }
}

function mapStateToProps(state) {
  return {
    products: state.cart.productsInCart
  }
}

export default connect(mapStateToProps, actions)(Cart);