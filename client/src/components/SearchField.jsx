import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SearchField extends Component {

  constructor(props) {
    super(props);

    this.state = { term: '' }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.searchProducts(e.currentTarget.value);
    this.setState({term: e.currentTarget.value})
  }

  render() {
    return <div>
      <input
        onChange={this.handleChange}
        value={this.state.term}
        placeholder="text"
      />
    </div>
  }
}

export default connect(null, actions)(SearchField);