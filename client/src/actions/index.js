import axios from 'axios';

import { AUTH_USER, AUTH_ERROR } from '../actions/types';

const ROOT_URL = 'http://localhost:3002';

export function registerUser(values) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/register`, values)
      .then(response => {
        // if request is accepted by the server we make a dispatch with proper action.type to
        // make the user authenticated in our application state
        dispatch({ type: AUTH_USER });
        // we then provide the new user with a jwt, coming from the response from the server
        localStorage.setItem('token', response.data.token);
      })
      //on the server side we validate registration info and if error are found we return 
      // an error status code together with a proper error message from the server which 
      // will put the user in this catch function. authError uses the AUTH_ERROR action.type
      .catch(error => dispatch(authError(error.response.data.error)));
  }
}
// helper function to handle errors and setting errors in app state
export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}