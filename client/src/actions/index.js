import axios from 'axios';

import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  AUTH_CURRENT,
  ADD_PRODUCT,
  GET_MESSAGE,
  GET_PRODUCTS,
  PRODUCTS_EDIT,
  GET_PRODUCT,
  SEARCH_PRODUCTS,
  CART_ADD,
  CART_FETCH,
  USER_GETpr
} from '../actions/types';

export const ROOT_URL = 'http://localhost:3002';

// helper function to handle errors and setting errors in app state
function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function registerUser(values, callback) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/register`, values)
      .then(response => {
        // if request is accepted by the server we make a dispatch with proper action.type to
        // make the user authenticated in our application state
        dispatch({ type: AUTH_USER });
        // we then provide the new user with a jwt, coming from the response from the server
        localStorage.setItem('token', response.data.token);
        callback();
      })
      //on the server side we validate registration info and if error are found we return 
      // an error status code together with a proper error message from the server which 
      // will put the user in this catch function. authError uses the AUTH_ERROR action.type
      .catch(error => dispatch(authError(error.response.data.error)));
  }
}

export function loginUser(values, callback) {
  return dispatch => {
    axios.post(`${ROOT_URL}/login`, values)
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        callback();
      })
      .catch(() => dispatch(authError('Bad Login')));
  }
}

export function getCurrentUser() {
  return dispatch => {
    axios.get(`${ROOT_URL}/currentuser`, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response =>
        dispatch({ type: AUTH_CURRENT, payload: response.data })
      );
  }
}

export function addProduct(values, callback) {
  return dispatch => {
    let data = new FormData();
    Object.keys(values).forEach(key => {
      data.append(key, values[key]);
    });
    axios.post(`${ROOT_URL}/addproduct`, data, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({ type: ADD_PRODUCT, payload: response.data.message });
        callback();
      })
      .catch(() => dispatch(authError('Could not add product to store')));
  };
}

export function logoutUser() {
  return dispatch => {
    dispatch({ type: UNAUTH_USER });
    localStorage.removeItem('token');
  }
}

export function getProducts() {
  return dispatch => {
    axios.get(`${ROOT_URL}/getproducts`)
      .then(response => {
        dispatch({ type: GET_PRODUCTS, payload: response.data })
      })
      .catch(() => dispatch(authError('no products found')));
  }
}

export function getProduct(id) {
  return dispatch => {
    axios.get(`${ROOT_URL}/getproduct/${id}`)
      .then(response => {
        dispatch({ type: GET_PRODUCT, payload: response.data })
      })
      .catch(() => dispatch(authError('No product found')));
  }
}

export function addToCart(productId) {
  return dispatch => {
    axios.post(`${ROOT_URL}/addtocart/${productId}`, null, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({ type: CART_ADD, payload: response.data });
      })
  }
}

export function fetchCart() {
  return dispatch => {
    axios.get(`${ROOT_URL}/getcart`, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => dispatch({ type: CART_FETCH, payload: response.data }))
  }
}

export function searchProducts(term, type) {
  return dispatch => {
    axios.post(`${ROOT_URL}/searchproducts`, { term, type })
      .then(response => dispatch({ type: SEARCH_PRODUCTS, payload: response.data }))
  }
}

export function getUser(id) {
  return dispatch => {
    axios.get(`${ROOT_URL}/getuser/${id}`)
      .then(res =>
        dispatch({ type: USER_GET, payload: res.data })
      )
  }
}

export function editProduct(values, id) {
  return dispatch => {
    let data = new FormData();
    Object.keys(values).forEach(key => {
      data.append(key, values[key]);
    });
    axios.post(`${ROOT_URL}/editproduct/${id}`, data)
      .then(res => dispatch({ type: PRODUCTS_EDIT, payload: res.data }))
  }
}