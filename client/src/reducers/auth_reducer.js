import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, AUTH_CURRENT } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return {...state, error: null, authed: true };
    case AUTH_ERROR:
      return {...state, error: action.payload};
    case UNAUTH_USER:
      return { ...state, error: null, authed: false }
    case AUTH_CURRENT:
      return { ...state, current: action.payload }
  }
  return state;
}