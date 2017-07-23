import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, ADD_PRODUCT, GET_MESSAGE } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return {...state, error: null, authed: true };
    case AUTH_ERROR:
      return {...state, error: action.payload};
    case UNAUTH_USER:
      return { ...state, error: null, authed: false }
    case ADD_PRODUCT:
      return { ...state, message: action.payload }
    case GET_MESSAGE:
      return { ...state, getMessage: action.payload }
  }
  return state;
}