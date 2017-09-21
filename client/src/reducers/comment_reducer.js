import { COMMENTS_GET } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case COMMENTS_GET:
      return { ...state, comments: action.payload };
  }
  return state;
}
