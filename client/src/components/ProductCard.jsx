import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ReactCardFlip from "react-card-flip";
import { connect } from "react-redux";
import * as actions from "../actions";

import { ROOT_URL } from "../actions/index.js";

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
    super(props);

    this.state = { isFlipped: false };
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchCart();
  }

  handleClick() {
    this.setState(
      () => (!this.state.isFlipped ? { isFlipped: true } : { isFlipped: false })
    );
  }

  handleSubmit() {
    this.props.addToCart(this.props.id);
  }

  renderButtonText() {
    const { authed, updatedCart, productsInCart, id } = this.props;
    if (authed) {
      if (updatedCart) {
        return updatedCart.includes(id) ? "Remove" : "Buy";
      } else {
        const productIds = productsInCart.map(product => product._id);
        return productIds.includes(id) ? "Remove" : "Buy";
      }
    } else {
      return "Buy";
    }
  }

  renderEdit() {
    return (
      <Link to={`/product/edit/${this.props.id}`}>
        Edit
      </Link>
    );
  }

  render() {
    return (
      <CardWrapper>
        <ReactCardFlip isFlipped={this.state.isFlipped}>
          <Front key="front">
            <UpperFront onClick={this.handleClick}>
              <ImgWrapper>
                <Img src={`${ROOT_URL}/uploads/${this.props.photo}`} alt={this.props.photo} />
              </ImgWrapper>
              <Link to={`/product/${this.props.id}`}>
                {this.props.title}
              </Link>
            </UpperFront>
            {this.props.currentUser === this.props.seller._id ? this.renderEdit() : null}
            <button onClick={this.handleSubmit} className="btn btn-primary pull-xs-right">
              {this.props.productsInCart && this.renderButtonText()}
            </button>
          </Front>
          <Back key="back" onClick={this.handleClick}>
            <Link to={`/user/${this.props.seller._id}`}>
              {this.props.seller.name}
            </Link>
            <p>Back</p>
            <p>Back</p>
          </Back>
        </ReactCardFlip>
      </CardWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    updatedCart: state.cart.updateCart,
    productsInCart: state.cart.productsInCart,
    authed: state.auth.authed,
  };
}

export default connect(mapStateToProps, actions)(ProductCard);
