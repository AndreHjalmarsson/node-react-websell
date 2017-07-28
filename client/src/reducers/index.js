import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './auth_reducer.js';
import productReducer from './product_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  product: productReducer
});

export default rootReducer;
