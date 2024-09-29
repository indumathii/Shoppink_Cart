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
export const SET_INITIAL_STATE = 'SET_INITIAL_STATE';
export const HANDLE_MEMBER_LIST = 'HANDLE_MEMBER_LIST';
export const HANDLE_SIGNOUT = 'HANDLE-SIGNOUT';
export const PRODUCTS_DISPATCH = 'PRODUCTS_DISPATCH';
export const ADD_TO_CART = 'ADD_TO_CART';
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';
export const CART_COUNT_CALCULATION = 'CART_COUNT_CALCULATION';
export const SHOW_CART = 'SHOW_CART';
export const HANDLE_PLACE_ORDER = 'HANDLE_PLACE_ORDER'
export const CART_TOTAL_VALUE = 'CART_TOTAL_VALUE'

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

export const handlememberlists = (payload) => ({
    type: HANDLE_MEMBER_LIST,
    payload,
})


export const handlesign_out = (payload) => ({
    type: HANDLE_SIGNOUT,
    payload,
})


export const products_dispatch = (payload) => ({
    type: PRODUCTS_DISPATCH,
    payload,
})


export const add_to_carts = (payload) => ({
    type: ADD_TO_CART,
    payload,
})


export const increments_quantity = (payload) => ({
    type: INCREMENT_QUANTITY,
    payload,
})


export const decrements_quantity = (payload) => ({
    type: DECREMENT_QUANTITY,
    payload,
})


export const cartcountcalculation = (payload) => ({
    type: CART_COUNT_CALCULATION,
    payload,
})


export const show_cart = (payload) => ({
    type: SHOW_CART,
    payload,
})

export const handle_place_order = (payload) => ({
    type: HANDLE_PLACE_ORDER,
    payload,
})

export const cart_total_value = (payload) => ({
    type: CART_TOTAL_VALUE,
    payload,
})