import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

// Before we render anything we check if there is a current token. If there is we dispatch
// the AUTH_USER type. This will keep the user logged in even when refreshing the browser etc.
const token = localStorage.getItem('token');
token ? store.dispatch({ type: AUTH_USER }) : null;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.querySelector('.container'));
