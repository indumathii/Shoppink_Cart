/*export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';

export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: product,
});

export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId,
});

export const updateCartQuantity = (productId, quantity) => ({
    type: UPDATE_CART_QUANTITY,
    payload: { productId, quantity },
});*/

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const HANDLE_LOGIN = 'HANDLE_LOGIN';
export const HANDLE_SUBMIT = 'HANDLE_SUBMIT';
export const SET_INITIAL_STATE = 'SET_INITIAL_STATE'

export const loginsuccess = (payload) => ({
    type: LOGIN_SUCCESS,
    payload,
})

export const loginfailure = (payload) => ({
    type: LOGIN_FAILURE,
    payload,
})

export const handlelogins = (payload) => ({
    type: HANDLE_LOGIN,
    payload,
})

export const handlesubmits = (payload) => ({
    type: HANDLE_SUBMIT,
    payload,
})

export const setinitialstate = (payload) => ({
    type: SET_INITIAL_STATE,
    payload,
})
