import { CART_ADD } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case CART_ADD:
      return { ...state, isInCart: action.payload }
  }
  return state;
}