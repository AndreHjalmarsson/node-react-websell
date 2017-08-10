import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { PRODUCT_TYPES } from '../helpers';

class SearchField extends Component {

  constructor(props) {
    super(props);

    this.state = { term: '' }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log(e);
    this.props.searchProducts(e.currentTarget.value);
    this.setState({term: e.currentTarget.value})
  }

  render() {
    return <div>
      <input
        onChange={this.handleChange}
        value={this.state.term}
        placeholder="Search for products"
      />
      <select onChange={this.handleChange}>
        <option />
          {
            PRODUCT_TYPES.map(type => <option key={type} value={type}>{type}</option>)
          }
      </select> 
    </div>
  }
}

export default connect(null, actions)(SearchField);