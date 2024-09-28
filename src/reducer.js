//import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from './actions';
import { HANDLE_LOGIN, HANDLE_SUBMIT, LOGIN_FAILURE, LOGIN_SUCCESS, SET_INITIAL_STATE } from './actions';

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


        default:
            return state;
    }
};

export default cartReducer;