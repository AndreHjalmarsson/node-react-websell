import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'; 

class Cart extends Component {
  render() {
    return <div>
      my cart
    </div>
  }
}

export default connect(null, actions)(Cart);