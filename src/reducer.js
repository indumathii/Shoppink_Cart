//import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from './actions';
import { ADD_TO_CART, CART_COUNT_CALCULATION, DECREMENT_QUANTITY, HANDLE_LOGIN, HANDLE_MEMBER_LIST, HANDLE_SIGNOUT, HANDLE_SUBMIT, INCREMENT_QUANTITY, LOGIN_FAILURE, LOGIN_SUCCESS, PRODUCTS_DISPATCH, SET_INITIAL_STATE } from './actions';

const initialState = {

    login: false,
    signup: false,
    productsdesc: false,
    currentuser: {},
    cartcount: 0,
    showcart: false,
    currentpid: false,
    totalcartvalue: false,
    placeorder: false,
    ismemberlist: false,
    users: [],
    ishome: false,
    isMenuVisible: false,
    iscategorylist: false,
    logsubmit: false,
    signupsubmit: false,
    productitems: [],
    usertxn: [],
    isloggedin: false,
    currentTime: new Date().toLocaleTimeString()

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


        default:
            return state;
    }
};

export default cartReducer;