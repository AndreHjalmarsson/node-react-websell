import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactCardFlip from 'react-card-flip';
import { connect } from 'react-redux';
import * as actions from '../actions';

import { ROOT_URL } from '../actions/index.js';

const CardWrapper = styled.div`
  margin-bottom: 320px !important;
  cursor: pointer;
`;

const Img = styled.img`
	max-width: 100%;
	max-height: 100%;
  border-radius: 7px 0px 0px 0px;
`;

const ImgWrapper = styled.div`
	background-color: #ededed;
	width: 100%;
	height: 70%;
  border-radius: 7px 7px 0px 0px;
`;

const Front = styled.div`
	background-color: #ededed;
	height: 300px;
  border-radius: 7px;
`;

const UpperFront = styled.div`
	background-color: #ededed;
	width: 100%;
	height: 85%;
	border-radius: 7px 7px 0px 0px;
`;

const Back = styled.div`
	background-color: #ededed;
	height: 300px;
	border-radius: 7px;
`;

class ProductCard extends Component {
	
	constructor(props) {
    super(props)

    this.state = { isFlipped: false };
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchCart();
  }
 
  handleClick() {
    this.setState(() => !this.state.isFlipped ? { isFlipped: true } : { isFlipped: false });
  }

  handleSubmit() {
    this.props.addToCart(this.props.id);
  }

  renderButtonText() {
    const { authed, cartMessage, productsInCart, id } = this.props;
    if (authed) {
      if (cartMessage) {
        return cartMessage.includes(id) ? 'Remove' : 'Buy';
      } else {
        const productIds = productsInCart.map(product => product._id);
        return productIds.includes(id) ? 'Remove' : 'Buy';
      }
    } else { return 'Buy'; }
  }
 
  render() {
    return <CardWrapper>
      <ReactCardFlip isFlipped={this.state.isFlipped}>
        <Front key="front">
          <UpperFront onClick={this.handleClick}>
            <ImgWrapper>
              <Img src={`${ROOT_URL}/uploads/${this.props.photo}`} alt={this.props.photo} />
            </ImgWrapper> 
            <Link to={`/product/${this.props.id}`}>{this.props.title}</Link>
            {this.props.seller.name}
            {this.props.id}
            {this.props.description}
          </UpperFront>
          <button onClick={this.handleSubmit} className="btn btn-primary pull-xs-right">
            { this.props.productsInCart && this.renderButtonText()}
          </button>
        </Front>
        <Back key="back" onClick={this.handleClick}>
          <p>Back</p>
          <p>Back</p>
          <p>Back</p>
        </Back>
      </ReactCardFlip>
    </CardWrapper>;
  }
};

function mapStateToProps(state) {
  return {
    cartMessage: state.cart.message,
    productsInCart: state.cart.productsInCart,
    authed: state.auth.authed
  }
}

export default connect(mapStateToProps, actions)(ProductCard);