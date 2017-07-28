import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
  render() {
    return <div>
				<Link to={`/product/${this.props.id}`} >
					{this.props.title}
				</Link>
			</div>;
  }
}

export default ProductCard;