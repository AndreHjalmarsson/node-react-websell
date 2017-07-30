import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FlipCard from 'react-flipcard';
import styled from 'styled-components';

const CardFront = styled.div`
  background-color: grey;
`
const CardBack = styled.div`
  background-color: grey;
`

class ProductCard extends Component {
	constructor(props) {
    super(props)
    this.state = { isFlipped: false}
  }
  
  toggleCard() {
    !this.state.isFlipped ? this.setState({ isFlipped: true }) : this.setState({ isFlipped: false })
  }

	handleOnFlip(flipped) {
		if (flipped) {
			this.refs.backButton.focus();
		}
	}

	render() {
		return <div>
				<FlipCard disabled={true} flipped={this.state.isFlipped} onFlip={this.handleOnFlip.bind(this)}>
					<CardFront>
						<div onClick={this.toggleCard.bind(this)}>
							<p>hej</p>
							<p>hej</p>
						</div>
					</CardFront>
					<CardBack>
						<div ref="backButton" onClick={this.toggleCard.bind(this)}>
							<p>back</p>
							<p>back</p>
						</div>
					</CardBack>
				</FlipCard>
			</div>;
	}
};

export default ProductCard;