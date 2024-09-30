//import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from './actions';
import { ADD_TO_CART, CART_COUNT_CALCULATION, CART_TOTAL_VALUE, DECREMENT_QUANTITY, HANDLE_BANNER, HANDLE_HOME, HANDLE_LOGIN, HANDLE_MEMBER_LIST, HANDLE_PLACE_ORDER, HANDLE_SIGNOUT, HANDLE_SUBMIT, INCREMENT_QUANTITY, LOGIN_FAILURE, LOGIN_SUCCESS, PLACE_ORDER, PRODUCTS_DISPATCH, SET_INITIAL_STATE, SHOW_CART, YOUR_ORDERS } from './actions';

const initialState = {

    login: false,
    signup: false,
    productsdesc: false,
    currentuser: {},
    cartcount: 0,
    showcart: false,
    currentpid: false,
    totalcartvalue: 0,
    placeorder: false,
    ismemberlist: false,
    users: [],
    ishome: false,
    isMenuVisible: false,
    iscategorylist: false,
    logsubmit: false,
    signupsubmit: false,
    productitems: [],
    temp_products: [],
    usertxn: [],
    isloggedin: false,
    currentcart_txns: [],
    currentTime: new Date().toLocaleTimeString(),
    yourorders: false

};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_INITIAL_STATE:
            return {
                ...state,
                ...action.payload,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                ...action.payload,
            };
        case HANDLE_LOGIN:
            return {
                ...state,
                ...action.payload,
            };
        case HANDLE_SUBMIT:
            return {
                ...state,
                ...action.payload,
            };
        case HANDLE_MEMBER_LIST:
            return {
                ...state,
                ...action.payload,
            };
        case HANDLE_SIGNOUT:
            return {
                ...state,
                ...action.payload,
            };
        case PRODUCTS_DISPATCH:
            return {
                ...state,
                ...action.payload,
            };
        case ADD_TO_CART:
            return {
                ...state,
                ...action.payload,
            };
        case INCREMENT_QUANTITY:
            return {
                ...state,
                ...action.payload,
            };
        case DECREMENT_QUANTITY:
            return {
                ...state,
                ...action.payload,
            };
        case CART_COUNT_CALCULATION:
            return {
                ...state,
                ...action.payload,
            };
        case SHOW_CART:
            return {
                ...state,
                ...action.payload,
            };
        case HANDLE_PLACE_ORDER:
            return {
                ...state,
                ...action.payload,
            };
        case CART_TOTAL_VALUE:
            return {
                ...state,
                ...action.payload,
            };
        case HANDLE_HOME:
            return {
                ...state,
                ...action.payload,
            };
        case PLACE_ORDER:
            return {
                ...state,
                ...action.payload,
            };
        case YOUR_ORDERS:
            return {
                ...state,
                ...action.payload,
            };
        case HANDLE_BANNER:
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
};

export default cartReducer;