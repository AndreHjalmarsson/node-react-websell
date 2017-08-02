import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactCardFlip from 'react-card-flip';

const CardWrapper = styled.div`
  margin-bottom: 320px !important;
  cursor: pointer;
`;

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const ImgWrapper = styled.div`
	background-color: red;
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
  }
 
  handleClick() {
    this.setState(() => !this.state.isFlipped ? { isFlipped: true } : { isFlipped: false });
  }
 
  render() {
    return <CardWrapper onClick={this.handleClick}>
				<ReactCardFlip isFlipped={this.state.isFlipped}>
					<Front key="front">
						<ImgWrapper>
							 <Img src={`http://localhost:3002/uploads/${this.props.photo}`} alt={this.props.photo} />
						</ImgWrapper>
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

export default ProductCard;