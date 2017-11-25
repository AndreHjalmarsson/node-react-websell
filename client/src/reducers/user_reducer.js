import { USER_GET } from '../actions/types';

export default function(state={}, action) {
  switch(action.type) {
    case USER_GET:
      return { ...state, user: action.payload }
  }
  return state;
}