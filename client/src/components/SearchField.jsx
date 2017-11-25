import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { PRODUCT_TYPES } from '../helpers';

class SearchField extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.props.searchProducts('', '');
  }

  handleChange() {
    this.props.searchProducts(this.searchInput.value, this.searchSelect.value);
  }

  render() {
    return (
      <div>
        <input
          onChange={this.handleChange}
          ref={input => (this.searchInput = input)}
          placeholder="Search for products"
        />
        <select
          onChange={this.handleChange}
          ref={select => (this.searchSelect = select)}
        >
          <option value="">Category</option>
          {PRODUCT_TYPES.map(type => <option key={type}>{type}</option>)}
        </select>
      </div>
    );
  }
}

export default connect(null, actions)(SearchField);
