import { ADD_PRODUCT, GET_PRODUCTS, GET_PRODUCT } from '../actions/types';

export default function(state={}, action) {
  switch(action.type) {
    case ADD_PRODUCT:
      return { ...state, message: action.payload }
    case GET_PRODUCTS:
      return { ...state, allProducts: action.payload }
    case GET_PRODUCT:
      return { ...state, singleProduct: action.payload }
  }

  return state;
}