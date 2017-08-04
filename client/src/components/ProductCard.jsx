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
	height: 50%;
	border-radius: 7px 7px 0px 0px;
`;

const Front = styled.div`
	background-color: #ededed;
	height: 300px;
	border-radius: 7px;
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
 
  handleClick() {
    this.setState(() => !this.state.isFlipped ? { isFlipped: true } : { isFlipped: false });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addToCart(this.props.id);
  }
 
  render() {
    return <CardWrapper onClick={this.handleClick}>
				<ReactCardFlip isFlipped={this.state.isFlipped}>
					<Front key="front">
						<ImgWrapper>
							 <Img src={`${ROOT_URL}/uploads/${this.props.photo}`} alt={this.props.photo} />
						</ImgWrapper> 
            <Link to={`/product/${this.props.id}`}>{this.props.title}</Link>
            <form onSubmit={this.handleSubmit}>
              <button type="submit" className="btn btn-primary pull-xs-right push-xs-down">
                { this.props.id !== this.props.isInCart ?  'Buy' : 'Remove' }
              </button>
            </form>
					</Front>
					<Back key="back">
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
    message: state.cart.message,
    isInCart: state.cart.isInCart
  }
}

export default connect(mapStateToProps, actions)(ProductCard);