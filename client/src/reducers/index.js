import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './auth_reducer.js';
import productReducer from './product_reducer';
import cartReducer from './cart_reducer';
import userReducer from './user_reducer';
import commentReducer from './comment_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
  user: userReducer,
  comment: commentReducer
});

export default rootReducer;
