import { CART_ADD, CART_FETCH } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case CART_ADD:
      return { ...state, message: action.payload.message }
    case CART_FETCH:
      return { ...state, productsInCart: action.payload }
  }
  return state;
}